import { ReactElement } from 'react';
import { images } from '../../assets/images';
import * as Svg from '../../assets/svg';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';

const heading = 'Pay on the Go';
const icon = 'fa-solid fa-location-crosshairs rounded-circle';
const img = 'img-fluid';
const roundImg = 'img-fluid rounded-circle';
const a = 'text-decoration-none btn btn-primary mt-2';

const commonChildren = (
  type: string,
  order: 'content-first' | 'content-last',
  linkClass: string,
  imgSrc?: string,
  imgClass?: string,
  imgWidth?: string
) => [
  {
    type: 'div',
    styles: { className: 'd-flex align-items-center flex-column gap-3' },
    children: [
      imgSrc && { type: 'img', content: imgSrc, styles: { className: imgClass, ...(imgWidth && { width: imgWidth }) } },
      type === 'i' && { type: 'i', styles: { className: icon } },
      { type: 'h2', content: heading, order },
    ].filter(Boolean),
  },
  { type: 'p', styles: { className: 'mt-3 text-center' }, content: description },
  {
    type: 'p',
    styles: { className: 'text-center' },
    content: '',
    children: [{ type: 'a', content: 'Read More', styles: { className: linkClass }, href: '#' }],
  },
];

const createComponent = (type: string, label: string, svg: ReactElement, children: any) => ({
  type,
  label,
  svg,
  children,
});

export const sections = [
  createComponent('component-1', 'Component 1', <Svg.Component1 />, [
    {
      type: 'div',
      styles: { className: 'col-12 col-md-6 d-flex align-items-center justify-content-center' },
      children: [{ type: 'img', content: images.image_57, styles: { className: img } }],
    },
    {
      type: 'div',
      styles: { className: 'col-12 col-md-6' },
      children: [
        {
          type: 'h2',
          content: heading,
          order: 'content-last',
          children: [{ type: 'i', styles: { className: icon } }],
        },
        { type: 'p', styles: { className: 'mt-3' }, content: description },
      ],
    },
  ]),
  createComponent('component-2', 'Component 2', <Svg.Component2 />, [
    {
      type: 'div',
      styles: { className: 'col-12 col-md-6 d-flex align-items-center justify-content-center' },
      children: [{ type: 'img', content: images.image_57, styles: { className: img } }],
    },
    {
      type: 'div',
      styles: { className: 'col-12 col-md-6' },
      children: [
        {
          type: 'h2',
          content: heading,
          styles: { className: 'text-center' },
          order: 'content-last',
          children: [{ type: 'i', styles: { className: icon } }],
        },
        { type: 'p', styles: { className: 'mt-3 text-center' }, content: description },
      ],
    },
  ]),
  createComponent(
    'component-3',
    'Component 3',
    <Svg.Component3 />,
    Array(2)
      .fill(null)
      .map((_, i) => ({
        type: 'div',
        styles: { className: 'col-12 col-md-6' },
        children: Array(3).fill({
          type: 'div',
          children: [
            {
              type: 'h2',
              content: heading,
              styles: { className: i === 0 ? 'text-end' : 'text-start' },
              children: [{ type: 'i', styles: { className: icon } }],
              order: 'content-last',
            },
            { type: 'p', styles: { className: `mt-3 text-${i === 0 ? 'end' : 'start'}` }, content: description },
          ],
        }),
      }))
  ),
  createComponent(
    'component-4',
    'Component 4',
    <Svg.Component4 />,
    Array(4).fill({
      type: 'div',
      styles: { className: 'col-12 col-md-4' },
      children: commonChildren('i', 'content-first', ''),
    })
  ),
  createComponent(
    'component-5',
    'Component 5',
    <Svg.Component5 />,
    Array(3).fill({
      type: 'div',
      styles: { className: 'col-12 col-md-4' },
      children: commonChildren('i', 'content-first', a),
    })
  ),
  createComponent(
    'component-9',
    'Component 9',
    <Svg.Component9 />,
    Array(3).fill({
      type: 'div',
      styles: { className: 'col-12 col-md-4' },
      children: commonChildren('img', 'content-first', a, images.image_57, img),
    })
  ),
  createComponent(
    'component-10',
    'Component 10',
    <Svg.Component10 />,
    Array(4).fill({
      type: 'div',
      styles: { className: 'col-12 col-md-4' },
      children: commonChildren('img', 'content-first', a, images.image_28, roundImg, '150px'),
    })
  ),
  createComponent(
    'component-19',
    'Component 19',
    <Svg.Component19 />,
    Array(3).fill({
      type: 'div',
      styles: { className: 'col-12 col-md-4 border p-4' },
      children: commonChildren('i', 'content-first', a),
    })
  ),
];
