import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  padding: string;
  backgroundColor: string;
  borderRadius: string;
}

const Container: React.FC<ContainerProps> = ({ children, padding, backgroundColor, borderRadius }) => {
  return (
    <div
      style={{
        padding,
        backgroundColor,
        borderRadius,
      }}
      className="my-3"
    >
      {children}
    </div>
  );
};

export default Container;
