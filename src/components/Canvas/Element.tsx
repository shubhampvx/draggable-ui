import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ElementTypes } from '../../constants';

interface ElementProps {
  element: {
    id: string;
    type: string;
    content: string;
    styles: Record<string, string>;
  };
}

export const Element: React.FC<ElementProps> = ({ element }) => {
  const { state, dispatch } = useBuilder();
  const isSelected = state.selectedElement?.id === element.id;

  const handleClick = () => {
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
      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        border: isSelected ? '1px solid blue' : 'none',
        padding: isSelected ? '4px' : '0',
      }}
    >
      {renderElement()}
    </div>
  );
};
