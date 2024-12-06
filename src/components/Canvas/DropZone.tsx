import React from 'react';
import { useDrop } from 'react-dnd';
import { useBuilder } from '../../context/BuilderContext';
import { v4 as uuidv4 } from 'uuid';
import { Element as RenderedElement } from './Element';

export const DropZone: React.FC = () => {
  const { state, dispatch } = useBuilder();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item: { type: string }) => {
      const newElement = {
        id: uuidv4(),
        type: item.type,
        content: `New ${item.type}`,
        styles: {},
      };
      dispatch({ type: 'ADD_ELEMENT', payload: newElement });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border border-2 border-dashed rounded p-4 ${isOver ? 'border-primary bg-light' : 'border-secondary'}`}
      style={{ minHeight: '100vh', overflowY: 'auto' }}
    >
      {isOver ? (
        <div className="d-flex align-items-center justify-content-center h-100">
          <p className="text-primary m-0">Drop element here</p>
        </div>
      ) : (
        <div>
          {state.elements.map((element) => (
            <RenderedElement key={element.id} element={element} />
          ))}
        </div>
      )}
    </div>
  );
};
