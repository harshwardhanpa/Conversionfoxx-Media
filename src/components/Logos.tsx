import React from 'react';
import Container from './ui/Container';

interface ClientLogo {
  name: string;
  category: string;
}

const clientList: ClientLogo[] = [
  { name: 'VertexScale', category: 'Enterprise SaaS' },
  { name: 'Quantos Global', category: 'FinTech Platform' },
  { name: 'OmniStream', category: 'HealthTech' },
  { name: 'Apex Logistics', category: 'Supply Chain' },
  { name: 'Synthex AI', category: 'AI Infrastructure' },
  { name: 'Cobalt Cloud', category: 'Cybersecurity' },
];

const Logos: React.FC = () => {
  return (
    <div className="py-8 bg-white/[0.01] border-y border-white/5 overflow-hidden">
      <Container>
        <div className="text-center mb-6">
          <p className="text-xs font-mono font-semibold text-white/50 uppercase tracking-widest">
            Scaling High-Velocity Growth Leaders Worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-center max-w-5xl mx-auto">
          {clientList.map((client) => (
            <div
              key={client.name}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center group hover:border-brand-primary/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="text-sm font-bold font-display text-white/80 group-hover:text-white transition-colors tracking-tight">
                {client.name}
              </div>
              <div className="text-[10px] font-mono text-white/40 group-hover:text-brand-primary/80 transition-colors mt-0.5">
                {client.category}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Logos;
