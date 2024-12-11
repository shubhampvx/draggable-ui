import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Element } from '../../types';

interface MultiElementComponentProps {
  element: Element;
}

export const MultiElementComponent: React.FC<MultiElementComponentProps> = ({ element }) => {
  const { dispatch } = useBuilder();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent, el: Element) => {
    e.stopPropagation();
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: el });
  };

  return (
    <div
      onClick={(e) => handleClick(e, element)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
        position: 'relative',
        ...element.styles,
      }}
    >
      {isHovered && (
        <div
          className="hover-border .div-123"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '1px solid blue',
            pointerEvents: 'none',
          }}
        />
      )}
      {element.children?.map((child) => {
        const [isHoverChild, setIsHoverChild] = useState(false);
        return (
          <div
            key={child.id}
            onClick={(e) => handleClick(e, child)}
            onMouseEnter={() => setIsHoverChild(true)}
            onMouseLeave={() => setIsHoverChild(false)}
            style={{
              marginBottom: '10px',
              position: 'relative',
              ...child.styles,
            }}
          >
            {isHoverChild && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: '1px solid blue',
                  pointerEvents: 'none',
                }}
              />
            )}
            {child.type === 'heading' && <h2>{child.content}</h2>}
            {child.type === 'text' && <p>{child.content}</p>}
            {child.type === 'button' && <button>{child.content}</button>}
            {child.type === 'image' && <img src={child.content} alt="Content" />}
          </div>
        );
      })}
    </div>
  );
};
