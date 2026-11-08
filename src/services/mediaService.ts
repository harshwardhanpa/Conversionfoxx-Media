import { supabase } from '../lib/supabaseClient';

export interface MediaFile {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  dimensions?: string;
  created_at: string;
  updated_at: string;
  url?: string;
}

export const mediaService = {
  async getMediaFiles() {
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Add public URL to each file
    const filesWithUrls = data.map(file => ({
      ...file,
      url: supabase.storage.from('media').getPublicUrl(file.file_path).data.publicUrl
    }));

    return filesWithUrls as MediaFile[];
  },

  async uploadFile(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Get dimensions if it's an image
    let dimensions = undefined;
    if (file.type.startsWith('image/')) {
      dimensions = await new Promise<string>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(`${img.width}x${img.height}`);
        img.onerror = () => resolve('');
        img.src = URL.createObjectURL(file);
      });
    }

    // 3. Save to Database
    const { data, error: dbError } = await supabase
      .from('media_files')
      .insert({
        name: file.name,
        file_path: filePath,
        file_type: file.type.split('/')[0], // image, video, etc.
        file_size: file.size,
        mime_type: file.type,
        dimensions: dimensions || null
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return {
      ...data,
      url: supabase.storage.from('media').getPublicUrl(data.file_path).data.publicUrl
    } as MediaFile;
  },

  async deleteFile(fileId: string, filePath: string) {
    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([filePath]);

    if (storageError) throw storageError;

    // 2. Delete from Database
    const { error: dbError } = await supabase
      .from('media_files')
      .delete()
      .eq('id', fileId);

    if (dbError) throw dbError;
  }
};
