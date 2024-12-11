import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Element } from '../../types';

interface Component1Props {
  element: Element;
}

export const Component1: React.FC<Component1Props> = ({ element }) => {
  const { dispatch } = useBuilder();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent, el: Element) => {
    e.stopPropagation();
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: el });
  };

  const renderChild = (child: Element) => {
    return <ChildElement key={child.id} child={child} handleClick={handleClick} />;
  };

  return (
    <div
      onClick={(e) => handleClick(e, element)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
        position: 'relative',
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
      <section className="container-lg" style={{ ...element.styles }}>
        <div className="features-part flex-column flex-md-row d-flex align-items-center justify-content-center gap-4">
          {element.children?.map((child) => renderChild(child))}
        </div>
      </section>
    </div>
  );
};

interface ChildElementProps {
  child: Element;
  handleClick: (e: React.MouseEvent, el: Element) => void;
}

const ChildElement: React.FC<ChildElementProps> = ({ child, handleClick }) => {
  const [isHoverChild, setIsHoverChild] = useState(false);
  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClick(e, child);
  };

  const renderElement = () => {
    const { className, ...styles } = child.styles;
    switch (child.type) {
      case 'div':
        return (
          <div
            onClick={handleChildClick}
            onMouseEnter={() => setIsHoverChild(true)}
            onMouseLeave={() => setIsHoverChild(false)}
            className={className}
            style={{
              ...styles,
              position: 'relative',
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
            {child.children?.map((grandchild) => (
              <ChildElement key={grandchild.id} child={grandchild} handleClick={handleClick} />
            ))}
          </div>
        );
      case 'img':
        return (
          <img
            onClick={handleChildClick}
            onMouseEnter={() => setIsHoverChild(true)}
            onMouseLeave={() => setIsHoverChild(false)}
            src={child.content}
            alt="Content"
            className={className}
            style={{
              ...styles,
              position: 'relative',
            }}
          />
        );
      case 'h2':
        return (
          <h2
            onClick={handleChildClick}
            onMouseEnter={() => setIsHoverChild(true)}
            onMouseLeave={() => setIsHoverChild(false)}
            className={className}
            style={{
              ...styles,
              position: 'relative',
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
            {child.children?.map((grandchild) => (
              <ChildElement key={grandchild.id} child={grandchild} handleClick={handleClick} />
            ))}
            {child.content}
          </h2>
        );
      case 'p':
        return (
          <p
            onClick={handleChildClick}
            onMouseEnter={() => setIsHoverChild(true)}
            onMouseLeave={() => setIsHoverChild(false)}
            className={className}
            style={{
              ...styles,
              position: 'relative',
            }}
          >
            {child.content}
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
          </p>
        );
      case 'i':
        return (
          <i
            onClick={handleChildClick}
            onMouseEnter={() => setIsHoverChild(true)}
            onMouseLeave={() => setIsHoverChild(false)}
            className={className}
            style={{
              ...styles,
              position: 'relative',
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
          </i>
        );
      default:
        return null;
    }
  };

  return renderElement();
};
