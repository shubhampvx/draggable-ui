import React from 'react';
import { Section as SectionType } from '../../types';
import { DropZone } from './DropZone';
import { Element } from './Element';

interface SectionProps {
  section: SectionType;
}

export const Section: React.FC<SectionProps> = ({ section }) => {
  return (
    <div className="card mb-4" style={section.styles}>
      <div className="card-body">
        {section.elements.map((element) => (
          <Element key={element.id} element={element} />
        ))}
        <DropZone sectionId={section.id} />
      </div>
    </div>
  );
};
