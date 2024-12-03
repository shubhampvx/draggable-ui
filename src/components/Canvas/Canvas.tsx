import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { DropZone } from './DropZone';
import { Section } from './Section';

interface CanvasProps {
  collectionId?: string;
}

export const Canvas: React.FC<CanvasProps> = ({ collectionId }) => {
  const { state } = useBuilder();

  return (
    <div className="bg-light p-4">
      <div className="container mx-auto">
        {state.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
        <DropZone sectionId={collectionId || 'new-section'} />
      </div>
    </div>
  );
};
