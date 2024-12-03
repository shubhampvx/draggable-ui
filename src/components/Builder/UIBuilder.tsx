import React from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '../Canvas/Canvas';

export const UIBuilder: React.FC = () => {
  const { collection_id } = useParams();

  return (
    <div className="h-100">
      <Canvas collectionId={collection_id} />
    </div>
  );
};
