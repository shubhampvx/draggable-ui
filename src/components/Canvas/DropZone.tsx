import React from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../../types';
import { useBuilder } from '../../context/BuilderContext';
import { v4 as uuidv4 } from 'uuid';
import { Element as RenderedElement } from './Element';

interface DropZoneProps {
  sectionId: string;
}

export const DropZone: React.FC<DropZoneProps> = ({ sectionId }) => {
  const { state, dispatch } = useBuilder();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item: { type: string }) => {
      console.log('Dropped item:', item);
      const newElement: Element = {
        id: uuidv4(),
        type: item.type,
        content: `New ${item.type}`,
        styles: {},
      };
      dispatch({
        type: 'ADD_ELEMENT_TO_SECTION',
        payload: { sectionId, element: newElement },
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const section = state.sections.find((sec) => sec.id === sectionId);

  return (
    <div
      ref={drop}
      className={`border border-2 border-dashed rounded p-4 ${isOver ? 'border-primary bg-light' : 'border-secondary'}`}
      style={{ height: '100vh' }}
    >
      {isOver && (
        <div className="d-flex align-items-center justify-content-center h-100">
          <p className="text-primary m-0">Drop element here</p>
        </div>
      )}
      <div>
        {section?.elements.map((element) => (
          <RenderedElement key={element.id} element={element} />
        ))}
      </div>
    </div>
  );
};
