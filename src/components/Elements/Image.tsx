import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  borderRadius: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, borderRadius }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        borderRadius,
      }}
      className="img-fluid my-3"
    />
  );
};

export default Image;
