import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ElementTypes } from '../../constants';
import { Element as RenderedElement } from '../../types';

interface ElementProps {
  element: RenderedElement;
}

export const Element: React.FC<ElementProps> = ({ element }) => {
  const { dispatch } = useBuilder();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: element });
  };

  const renderElement = () => {
    switch (element.type) {
      case ElementTypes.HEADING:
        return <h2 style={element.styles}>{element.content}</h2>;
      case ElementTypes.TEXT:
        return <p style={element.styles}>{element.content}</p>;
      case ElementTypes.BUTTON:
        return <button style={element.styles}>{element.content}</button>;
      case ElementTypes.IMAGE:
        return <img src={element.content} alt="Content" style={element.styles} />;
      case 'div':
        return (
          <div style={element.styles}>
            {element.children?.map((child) => (
              <Element key={child.id} element={child} />
            ))}
          </div>
        );
      case 'i':
        return <i className={element?.styles?.className}></i>;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
        border: isHovered ? '1px solid blue' : 'none',
        ...element.styles,
      }}
    >
      {renderElement()}
    </div>
  );
};
