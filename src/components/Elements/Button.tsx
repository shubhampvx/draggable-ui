import React from 'react';

interface ButtonProps {
  label: string;
  width: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, width, backgroundColor, textColor, borderRadius, onClick }) => {
  return (
    <button
      style={{
        width,
        backgroundColor,
        color: textColor,
        borderRadius,
      }}
      className="btn py-2 px-3 my-3"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
