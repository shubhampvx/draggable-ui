import React from 'react';
import { useBuilder } from '../../context/BuilderContext';

export const CodePanel: React.FC = () => {
  const { state } = useBuilder();

  const generateClassName = (elementId: string) => `element-${elementId}`;

  const generateCSS = () => {
    return state.elements
      .map((element) => {
        const className = generateClassName(element.id);
        const styles = Object.entries(element.styles)
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ');

        return `.${className} { ${styles} }`;
      })
      .join('\n');
  };

  const generateHTML = () => {
    return state.elements
      .map((element) => {
        const className = generateClassName(element.id);

        switch (element.type.toLowerCase()) {
          case 'heading':
            return `<h2 class="${className}">${element.content}</h2>`;
          case 'text':
            return `<p class="${className}">${element.content}</p>`;
          case 'button':
            return `<button class="${className}">${element.content}</button>`;
          case 'image':
            return `<img src="${element.content}" alt="Content" class="${className}" />`;
          default:
            return '';
        }
      })
      .join('\n');
  };

  const generateFullHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
      ${generateCSS()}
    </style>
  </head>
  <body>
    ${generateHTML()}
  </body>
</html>`;
  };

  return (
    <div className="p-3">
      <h5>Generated Code</h5>
      <pre>
        <code>{generateFullHTML()}</code>
      </pre>
    </div>
  );
};
