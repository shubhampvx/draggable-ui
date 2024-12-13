import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Element } from '../../types';

interface MultiElementProps {
  element: Element;
}

export const MultiElement: React.FC<MultiElementProps> = ({ element }) => {
  const { dispatch } = useBuilder();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent, el: Element) => {
    e.stopPropagation();
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: el });
  };

  const renderChild = (child: Element) => <ChildElement key={child.id} child={child} handleClick={handleClick} />;

  return (
    <div
      onClick={(e) => handleClick(e, element)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <HoverElement hover={isHovered} />
      <section className="container-lg" style={{ ...element.styles }}>
        <div className="flex-column flex-md-row d-flex align-items-center justify-content-center gap-4">
          {element.children?.map((child) => renderChild(child))}
        </div>
      </section>
    </div>
  );
};

const HoverElement = ({ hover }: { hover: boolean }) => {
  if (!hover) return null;
  return (
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

  const JsxElement: React.FC<{ tag: string; children?: React.ReactNode; content?: string }> = ({
    tag,
    children,
    content,
  }) => {
    const Tag = tag as keyof JSX.IntrinsicElements;
    const { className, ...styles } = child.styles || {};

    if (tag === 'img') {
      return (
        <Tag
          onClick={handleChildClick}
          onMouseEnter={() => setIsHoverChild(true)}
          onMouseLeave={() => setIsHoverChild(false)}
          src={content}
          alt="Content"
          className={className}
          style={{ ...styles, position: 'relative' }}
        />
      );
    }

    return (
      <Tag
        onClick={handleChildClick}
        onMouseEnter={() => setIsHoverChild(true)}
        onMouseLeave={() => setIsHoverChild(false)}
        className={className}
        style={{ ...styles, position: 'relative' }}
      >
        <HoverElement hover={isHoverChild} />
        {children}
      </Tag>
    );
  };

  const renderContentAndChildren = (child: Element) => {
    if (child.order === 'content-first') {
      return (
        <>
          {child.content}
          {child.children?.map((grandchild) => (
            <ChildElement key={grandchild.id} child={grandchild} handleClick={handleClick} />
          ))}
        </>
      );
    } else {
      return (
        <>
          {child.children?.map((grandchild) => (
            <ChildElement key={grandchild.id} child={grandchild} handleClick={handleClick} />
          ))}
          {child.content}
        </>
      );
    }
  };

  const renderElement = () => {
    switch (child.type) {
      case 'div':
      case 'h2':
      case 'p':
      case 'a':
      case 'i':
        return <JsxElement tag={child.type}>{renderContentAndChildren(child)}</JsxElement>;
      case 'img':
        return <JsxElement tag={child.type} content={child.content} />;
      default:
        return null;
    }
  };

  return renderElement();
};
