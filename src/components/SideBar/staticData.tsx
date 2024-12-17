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
  createComponent('component-7', 'Component 7', <Svg.Component7 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: {
                className: 'w-100 features-content d-flex flex-column align-items-center justify-content-center h-100',
              },
              children: commonChildren('i', 'content-first', a),
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'row' },
              children: Array(4).fill({
                type: 'div',
                styles: { className: 'col-12 col-md-6' },
                children: commonChildren('i', 'content-first', a),
              }),
            },
          ],
        },
      ],
    },
  ]),
  createComponent('component-8', 'Component 8', <Svg.Component8 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-12' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column align-items-center justify-content-center h-100' },
              children: [
                {
                  type: 'div',
                  styles: { className: 'd-flex align-items-center flex-column gap-3' },
                  children: [{ type: 'h2', content: heading, order: 'content-first' }],
                },
                {
                  type: 'p',
                  styles: { className: 'text-center' },
                  content: description,
                  order: 'content-first',
                  children: [
                    { type: 'p', children: [{ type: 'a', content: 'Read More', styles: { className: a }, href: '#' }] },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-12' },
          children: [{ type: 'img', styles: { className: img }, content: images.image_53 }],
        },
      ],
    },
  ]),
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
  createComponent('component-11', 'Component 11', <Svg.Component11 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [{ type: 'img', styles: { className: img }, content: images.image_57 }],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex w-100 align-items-center flex-column justify-content-center h-100' },
              children: Array(3).fill({
                type: 'div',
                styles: { className: 'd-flex flex-column align-items-start' },
                children: [
                  {
                    type: 'div',
                    styles: { className: 'd-flex align-items-center flex-column gap-3' },
                    children: [{ type: 'h2', content: heading, order: 'content-first' }],
                  },
                  { type: 'p', content: description, order: 'content-first' },
                ],
              }),
            },
          ],
        },
      ],
    },
  ]),
  createComponent('component-12', 'Component 12', <Svg.Component12 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: Array(2).fill({
        type: 'div',
        styles: { className: 'col-12 col-md-6' },
        children: [
          {
            type: 'div',
            styles: { className: 'd-flex flex-column align-items-start' },
            children: [
              {
                type: 'div',
                styles: { className: 'd-flex align-items-start flex-column gap-3' },
                children: [
                  { type: 'img', styles: { className: img }, content: images.image_57 },
                  { type: 'h2', content: heading, order: 'content-first' },
                ],
              },
              {
                type: 'p',
                content: description,
                order: 'content-first',
                children: [
                  {
                    type: 'p',
                    children: [{ type: 'a', content: 'Read More', styles: { className: a }, href: '#' }],
                  },
                ],
              },
            ],
          },
        ],
      }),
    },
  ]),
  createComponent('component-13', 'Component 13', <Svg.Component13 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: Array(2).fill({
        type: 'div',
        styles: { className: 'col-12 col-md-6' },
        children: [
          {
            type: 'div',
            styles: { className: 'd-flex flex-column gap-3' },
            children: Array(2).fill({
              type: 'div',
              styles: { className: 'd-flex flex-column flex-md-row align-items-start bg-light' },
              children: [
                {
                  type: 'div',
                  styles: { className: 'd-flex align-items-start flex-column gap-3 me-3' },
                  children: [{ type: 'i', styles: { className: icon } }],
                },
                {
                  type: 'div',
                  children: [
                    { type: 'h2', content: heading, order: 'content-first' },
                    { type: 'p', content: description, order: 'content-first' },
                    {
                      type: 'p',
                      children: [{ type: 'a', content: 'Read More', styles: { className: a }, href: '#' }],
                    },
                  ],
                },
              ],
            }),
          },
        ],
      }),
    },
  ]),
  createComponent(
    'component-14',
    'Component 14',
    <Svg.Component14 />,
    Array(2).fill({
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column gap-3' },
              children: [{ type: 'img', styles: { className: img }, content: images.image_53 }],
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column gap-3' },
              children: [
                {
                  type: 'div',
                  styles: { className: ' d-flex flex-column flex-md-row align-items-start' },
                  children: [
                    {
                      type: 'div',
                      children: [
                        { type: 'h2', content: heading, order: 'content-first' },
                        { type: 'p', content: description, order: 'content-first' },
                        {
                          type: 'p',
                          children: [{ type: 'a', content: 'Read More', styles: { className: a }, href: '#' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
  ),
  createComponent('component-15', 'Component 15', <Svg.Component15 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column gap-3' },
              children: [{ type: 'img', styles: { className: img }, content: images.image_57 }],
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex bg-light w-100 h-100 align-items-center p-4' },
              children: [
                {
                  type: 'div',
                  styles: { className: 'd-flex flex-column align-items-center' },
                  children: commonChildren('img', 'content-first', a, images.image_28, roundImg, '150px'),
                },
              ],
            },
          ],
        },
      ],
    },
  ]),
  createComponent('component-16', 'Component 16', <Svg.Component16 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column gap-3' },
              children: [{ type: 'img', styles: { className: img }, content: images.image_57 }],
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex bg-light w-100 h-100 align-items-center p-4' },
              children: [
                {
                  type: 'div',
                  styles: { className: 'd-flex flex-column align-items-center' },
                  children: commonChildren('img', 'content-first', a),
                },
              ],
            },
          ],
        },
      ],
    },
  ]),
  createComponent('component-17', 'Component 17', <Svg.Component17 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-4' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column align-items-center' },
              children: [
                {
                  type: 'div',
                  styles: { className: 'd-flex align-items-center flex-column gap-3' },
                  children: [{ type: 'img', styles: { className: img }, content: images.image_57 }],
                },
              ],
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-4' },
          children: [
            {
              type: 'div',
              styles: { className: 'w-100 d-flex flex-column align-items-center justify-content-center h-100' },
              children: commonChildren('img', 'content-first', a),
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-4' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column align-items-center' },
              children: [
                {
                  type: 'div',
                  styles: { className: 'd-flex align-items-center flex-column gap-3' },
                  children: [{ type: 'img', styles: { className: img }, content: images.image_57 }],
                },
              ],
            },
          ],
        },
      ],
    },
  ]),
  createComponent('component-18', 'Component 18', <Svg.Component18 />, [
    {
      type: 'div',
      styles: { className: 'row' },
      children: [
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex flex-column' },
              children: [{ type: 'img', styles: { className: img }, content: images.image_57 }],
            },
          ],
        },
        {
          type: 'div',
          styles: { className: 'col-12 col-md-6' },
          children: [
            {
              type: 'div',
              styles: { className: 'd-flex align-items-center h-100' },
              children: [
                {
                  type: 'div',
                  styles: { className: 'w-100 d-flex flex-column align-items-center p-4' },
                  children: commonChildren('img', 'content-first', a),
                },
              ],
            },
          ],
        },
      ],
    },
  ]),
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
