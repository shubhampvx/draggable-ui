import React, { useState, useEffect } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Element } from '../../types';

export const CodePanel: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(generateFullHTML().trim());
  }, [state]);

  const generateClassName = (elementId: string) => `element-${elementId}`;

  const generateCSS = () => {
    const generateElementCSS = (element: Element) => {
      const htmlClass = generateClassName(element.id);
      const { className, ...styles } = element.styles || {};
      const htmlStyles = Object.entries(styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');

      return htmlStyles ? `.${htmlClass} { ${htmlStyles} }` : '';
    };

    const generateNestedCSS = (element: Element) => {
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

  const generateClassAttribute = (element: Element) => {
    const className = generateClassName(element.id);
    const combinedClassName = element?.styles?.className ? `${element.styles.className} ${className}` : className;
    const { className: _, ...styles } = element.styles || {};
    const hasStyles = Object.keys(styles).length > 0;
    return hasStyles ? combinedClassName : element?.styles?.className || '';
  };

  const generateHTML = () => {
    const generateElementHTML = (element: Element) => {
      const classAttribute = generateClassAttribute(element);

      let childrenHTML = '';
      if (element.children) {
        childrenHTML = element.children.map((child) => generateElementHTML(child)).join('');
      }

      const componentTypes = new Set([
        'component-1',
        'component-2',
        'component-3',
        'component-4',
        'component-5',
        'component-7',
        'component-8',
        'component-9',
        'component-10',
        'component-11',
        'component-12',
        'component-13',
        'component-14',
        'component-15',
        'component-16',
        'component-17',
        'component-18',
        'component-19',
      ]);

      if (componentTypes.has(element.type.toLowerCase())) {
        return `
      <section class="container-lg ${classAttribute}">
        <div class="features-part flex-column flex-md-row d-flex align-items-center justify-content-center gap-4">
          ${childrenHTML}
        </div>
      </section>
    `;
      }

      switch (element.type.toLowerCase()) {
        case 'heading':
          return `<h2 class="${classAttribute}">${element.content}${childrenHTML}</h2>`;
        case 'text':
          return `<p class="${classAttribute}">${element.content}${childrenHTML}</p>`;
        case 'button':
          return `<button class="${classAttribute}">${element.content}${childrenHTML}</button>`;
        case 'image':
          return `<img src="${element.content}" alt="Content" class="${classAttribute}" />`;
        case 'div':
          return `<div class="${classAttribute}">${childrenHTML}</div>`;
        case 'img':
          return `<img src="${element.content}" alt="Content" class="${classAttribute}" />`;
        case 'h2':
          return `<h2 class="${classAttribute}">
          ${element.order === 'content-first' ? element.content : ''}
          ${childrenHTML}
          ${element.order === 'content-last' ? element.content : ''}
          </h2>`;
        case 'p':
          return `<p class="${classAttribute}">${element.content}${childrenHTML}</p>`;
        case 'a':
          return `<a href="${element.href}" class="${classAttribute}">${element.content}${childrenHTML}</a>`;
        case 'i':
          return `<i class="${classAttribute}">${childrenHTML}</i>`;
        default:
          return `<${element.type} class="${classAttribute}">${element.content}${childrenHTML}</${element.type}>`;
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
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
      integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
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
      const elementStyles = styles.split('}').reduce(
        (acc, styleRule) => {
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
        },
        {} as Record<string, string>
      );

      const children = Array.from(element.children).map((child) => {
        const childId = child.className.replace('element-', '');
        const childStyles = styles.split('}').reduce(
          (acc, styleRule) => {
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
          },
          {} as Record<string, string>
        );

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
