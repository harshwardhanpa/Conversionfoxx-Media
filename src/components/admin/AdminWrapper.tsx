import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminAuthProvider } from '../../context/AdminAuthContext';

const AdminWrapper: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
};

export default AdminWrapper;
