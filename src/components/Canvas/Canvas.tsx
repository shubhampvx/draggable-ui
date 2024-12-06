import React from 'react';
import { DropZone } from './DropZone';

export const Canvas: React.FC = () => {
  return (
    <div className="bg-light py-4">
      <div className="container mx-auto">
        <DropZone />
      </div>
    </div>
  );
};
