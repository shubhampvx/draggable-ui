import React from 'react';
import { useDrag } from 'react-dnd';
import { Accordion } from 'react-bootstrap';
import { sections } from './staticData';

const DraggableSection: React.FC<{
  type: string;
  svg: React.ReactNode;
  children: any[];
}> = ({ type, svg, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SECTION',
    item: { type, children },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border rounded mb-2 ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move', backgroundColor: '#f8f9fa', overflow: 'hidden' }}
    >
      {svg}
    </div>
  );
};

export const SectionsPanel: React.FC = () => {
  return (
    <div className="px-1">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Sections</Accordion.Header>
          <Accordion.Body>
            {sections.map((section) => (
              <DraggableSection key={section.type} type={section.type} svg={section.svg} children={section.children} />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
