import React from 'react';
import { Element as ElementType } from '../../types';
import { useBuilder } from '../../context/BuilderContext';
import { ElementTypes } from '../../constants';

interface ElementProps {
  element: ElementType;
}

export const Element: React.FC<ElementProps> = ({ element }) => {
  const { dispatch } = useBuilder();

  const handleClick = () => {
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: element });
  };

  const renderElement = () => {
    switch (element.type) {
      case ElementTypes.HEADING:
        return (
          <h2 className="h2" style={element.styles}>
            {element.content}
          </h2>
        );
      case ElementTypes.TEXT:
        return (
          <p className="lead" style={element.styles}>
            {element.content}
          </p>
        );
      case ElementTypes.BUTTON:
        return (
          <button className="btn btn-primary" style={element.styles}>
            {element.content}
          </button>
        );
      case ElementTypes.IMAGE:
        return <img src={element.content} alt="Content" className="img-fluid" style={element.styles} />;
      default:
        return null;
    }
  };

  return (
    <div onClick={handleClick} className="position-relative element-wrapper" style={{ cursor: 'pointer' }}>
      {renderElement()}
      <div className="element-overlay position-absolute top-0 start-0 w-100 h-100" />
    </div>
  );
};
