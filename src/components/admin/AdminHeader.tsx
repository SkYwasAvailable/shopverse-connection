
import React from 'react';

interface AdminHeaderProps {
  title: string;
  description: string;
}

const AdminHeader = ({ title, description }: AdminHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default AdminHeader;
