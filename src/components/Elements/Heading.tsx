import React from 'react';

interface HeadingProps {
  text: string;
  fontSize: string;
  textColor: string;
  textAlign: 'left' | 'center' | 'right';
}

const Heading: React.FC<HeadingProps> = ({ text, fontSize, textColor, textAlign }) => {
  return (
    <h1
      style={{
        fontSize,
        color: textColor,
        textAlign,
      }}
      className="my-3"
    >
      {text}
    </h1>
  );
};

export default Heading;
