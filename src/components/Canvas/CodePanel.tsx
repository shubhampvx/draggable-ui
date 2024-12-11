import React, { useState, useEffect } from 'react';
import { useBuilder } from '../../context/BuilderContext';

export const CodePanel: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(generateFullHTML());
  }, [state]);

  const generateClassName = (elementId: string) => `element-${elementId}`;

  const generateCSS = () => {
    const generateElementCSS = (element) => {
      const className = generateClassName(element.id);
      const styles = Object.entries(element.styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');

      return `.${className} { ${styles} }`;
    };

    const generateNestedCSS = (element) => {
      let css = generateElementCSS(element);
      if (element.children) {
        element.children.forEach((child) => {
          css += generateNestedCSS(child);
        });
      }
      return css;
    };

    return state.elements.map((element) => generateNestedCSS(element)).join('\n');
  };

  const generateHTML = () => {
    const generateElementHTML = (element) => {
      const className = generateClassName(element.id);
      const combinedClassName = element.styles.className ? `${element.styles.className} ${className}` : className;

      let childrenHTML = '';
      if (element.children) {
        childrenHTML = element.children.map((child) => generateElementHTML(child)).join('');
      }

      switch (element.type.toLowerCase()) {
        case 'heading':
          return `<h2 class="${combinedClassName}">${element.content}${childrenHTML}</h2>`;
        case 'text':
          return `<p class="${combinedClassName}">${element.content}${childrenHTML}</p>`;
        case 'button':
          return `<button class="${combinedClassName}">${element.content}${childrenHTML}</button>`;
        case 'image':
          return `<img src="${element.content}" alt="Content" class="${combinedClassName}" />`;
        case 'component-1':
          return `
            <section class="container-lg ${combinedClassName}">
              <div class="features-part flex-column flex-md-row d-flex align-items-center justify-content-center gap-4">
                ${childrenHTML}
              </div>
            </section>
          `;
        case 'div':
          return `<div class="${combinedClassName}">${childrenHTML}</div>`;
        case 'img':
          return `<img src="${element.content}" alt="Content" class="${combinedClassName}" />`;
        case 'h2':
          return `<h2 class="${combinedClassName}">${element.content}${childrenHTML}</h2>`;
        case 'p':
          return `<p class="${combinedClassName}">${element.content}${childrenHTML}</p>`;
        case 'i':
          return `<i class="${combinedClassName}">${childrenHTML}</i>`;
        default:
          return `<${element.type} class="${combinedClassName}">${element.content}${childrenHTML}</${element.type}>`;
      }
    };

    return state.elements.map((element) => generateElementHTML(element)).join('\n');
  };

  const generateFullHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <style>
      ${generateCSS()}
    </style>
  </head>
  <body>
    ${generateHTML()}
  </body>
</html>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedCode = e.target.value;
    setCode(updatedCode);

    const parser = new DOMParser();
    const doc = parser.parseFromString(updatedCode, 'text/html');

    const styleElement = doc.querySelector('style');
    const styles = styleElement ? styleElement.innerHTML : '';

    const newElements = Array.from(doc.body.children).map((element) => {
      const id = element.className.replace('element-', '');
      const elementStyles = styles.split('}').reduce((acc, styleRule) => {
        const [selector, style] = styleRule.split('{');
        if (selector && style && selector.includes(`.${id}`)) {
          style.split(';').forEach((styleDeclaration) => {
            const [key, value] = styleDeclaration.split(':').map((s) => s.trim());
            if (key && value) {
              acc[key] = value;
            }
          });
        }
        return acc;
      }, {} as Record<string, string>);

      const children = Array.from(element.children).map((child) => {
        const childId = child.className.replace('element-', '');
        const childStyles = styles.split('}').reduce((acc, styleRule) => {
          const [selector, style] = styleRule.split('{');
          if (selector && style && selector.includes(`.${childId}`)) {
            style.split(';').forEach((styleDeclaration) => {
              const [key, value] = styleDeclaration.split(':').map((s) => s.trim());
              if (key && value) {
                acc[key] = value;
              }
            });
          }
          return acc;
        }, {} as Record<string, string>);

        return {
          id: childId,
          type: child.tagName.toLowerCase(),
          content: child.innerHTML,
          styles: childStyles,
        };
      });

      return {
        id,
        type: element.tagName.toLowerCase(),
        content: element.innerHTML,
        styles: elementStyles,
        children,
      };
    });

    dispatch({ type: 'SET_ELEMENTS', payload: newElements });
  };

  return (
    <div className="p-3">
      <h5>Generated Code</h5>
      <button className="btn btn-secondary mb-3" onClick={copyToClipboard}>
        Copy to Clipboard
      </button>
      <textarea className="form-control" rows={10} value={code} onChange={handleCodeChange} />
    </div>
  );
};
