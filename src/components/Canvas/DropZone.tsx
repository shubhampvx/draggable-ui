import React from 'react';
import { useDrop } from 'react-dnd';
import { useBuilder } from '../../context/BuilderContext';
import { v4 as uuidv4 } from 'uuid';
import { Element as RenderedElement } from './Element';
import { Element } from '../../types';
import { Component1 } from './Component1';

export const DropZone: React.FC = () => {
  const { state, dispatch } = useBuilder();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['ELEMENT', 'SECTION'],
    drop: (item: { type: string; html?: string; children?: Element[] }) => {
      const processChildren = (children: Element[] | undefined): Element[] | undefined => {
        return children?.map((child) => ({
          id: uuidv4(),
          type: child.type,
          content: child.content,
          styles: child.styles || {},
          children: processChildren(child.children),
        }));
      };

      let newElement;
      newElement = {
        id: uuidv4(),
        type: item.type,
        content: `New ${item.type}`,
        styles: {},
        children: processChildren(item.children),
      };
      dispatch({ type: 'ADD_ELEMENT', payload: newElement });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const renderElement = (element: Element) => {
    if (element.children && element.children.length > 0) {
      return <Component1 element={element} />;
    }
    return <RenderedElement element={element} />;
  };

  return (
    <div
      ref={drop}
      className={`border border-2 border-dashed rounded p-4 ${isOver ? 'border-primary bg-light' : 'border-secondary'}`}
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      {isOver && (
        <div className="d-flex align-items-center justify-content-center h-100">
          <p className="text-primary m-0">Drop element here</p>
        </div>
      )}
      <div>
        {state.elements.map((element) => (
          <div key={element.id}>{renderElement(element)}</div>
        ))}
      </div>
    </div>
  );
};
