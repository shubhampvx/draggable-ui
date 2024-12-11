import React from 'react';
import { useDrag } from 'react-dnd';
import { ElementTypes } from '../../constants';
import { Accordion } from 'react-bootstrap';

const elements = [
  { type: ElementTypes.HEADING, label: 'Heading' },
  { type: ElementTypes.TEXT, label: 'Text' },
  { type: ElementTypes.IMAGE, label: 'Image' },
  { type: ElementTypes.BUTTON, label: 'Button' },
];

const DraggableElement: React.FC<{ type: string; label: string }> = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border rounded mb-2 ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move', backgroundColor: '#f8f9fa' }}
    >
      {label}
    </div>
  );
};

export const ElementsPanel: React.FC = () => {
  return (
    <div className="px-1 py-3">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Elements</Accordion.Header>
          <Accordion.Body>
            {elements.map((element) => (
              <DraggableElement key={element.type} type={element.type} label={element.label} />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
