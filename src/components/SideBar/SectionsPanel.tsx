import React from 'react';
import { useDrag } from 'react-dnd';
import { Accordion } from 'react-bootstrap';
import Component1 from '../../assets/Component1';
import { images } from '../../images';

const sections = [
  {
    type: 'component-1',
    label: 'Component 1',
    svg: <Component1 />,
    children: [
      {
        type: 'div',
        styles: { className: 'col-12 col-md-6 d-flex align-items-center justify-content-center features-img' },
        children: [{ type: 'img', content: images.image_57, styles: { className: 'img-fluid' } }],
      },
      {
        type: 'div',
        styles: { className: 'col-12 col-md-6 features-content' },
        children: [
          {
            type: 'h2',
            content: 'Pay on the Go',
            children: [{ type: 'i', styles: { className: 'fa-solid fa-location-crosshairs rounded-circle' } }],
          },
          {
            type: 'p',
            styles: { className: 'd-flex align-itmes-center justify-content-center gap-3 mt-3' },
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
          },
        ],
      },
    ],
  },
];

const DraggableSection: React.FC<{
  type: string;
  svg: React.ReactNode;
  children: any[];
}> = ({ type, svg, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SECTION',
    item: { type, children },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border rounded mb-2 ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move', backgroundColor: '#f8f9fa', overflow: 'hidden' }}
    >
      {svg}
    </div>
  );
};

export const SectionsPanel: React.FC = () => {
  return (
    <div className="px-1">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Sections</Accordion.Header>
          <Accordion.Body>
            {sections.map((section) => (
              <DraggableSection key={section.type} type={section.type} svg={section.svg} children={section.children} />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
