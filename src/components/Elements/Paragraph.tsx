import React from 'react';

interface ParagraphProps {
  text: string;
  fontSize: string;
  textColor: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, fontSize, textColor, textAlign, lineHeight }) => {
  return (
    <p
      style={{
        fontSize,
        color: textColor,
        textAlign,
        lineHeight,
      }}
      className="my-3"
    >
      {text}
    </p>
  );
};

export default Paragraph;
