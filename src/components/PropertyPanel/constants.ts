export const borderTypes = [
  { label: 'None', value: 'none' },
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
];

export const layoutProperties = [
  {
    label: 'Display',
    key: 'display',
    options: [
      { name: 'Block', value: 'block' },
      { name: 'Inline', value: 'inline' },
      { name: 'Inline Block', value: 'inline-block' },
      { name: 'Flex', value: 'flex' },
      { name: 'Inline Flex', value: 'inline-flex' },
      { name: 'None', value: 'none' },
    ],
  },
  {
    label: 'Flex Direction',
    key: 'flex-direction',
    options: [
      { name: 'Row', value: 'row' },
      { name: 'Row Reverse', value: 'row-reverse' },
      { name: 'Column', value: 'column' },
      { name: 'Column Reverse', value: 'column-reverse' },
    ],
    condition: (styles: Record<string, string>) => styles.display === 'flex' || styles.display === 'inline-flex',
  },
  {
    label: 'Justify Content',
    key: 'justify-content',
    options: [
      { name: 'Flex Start', value: 'flex-start' },
      { name: 'Flex End', value: 'flex-end' },
      { name: 'Center', value: 'center' },
      { name: 'Space Between', value: 'space-between' },
      { name: 'Space Around', value: 'space-around' },
      { name: 'Space Evenly', value: 'space-evenly' },
    ],
    condition: (styles: Record<string, string>) => styles.display === 'flex' || styles.display === 'inline-flex',
  },
  {
    label: 'Align Items',
    key: 'align-items',
    options: [
      { name: 'Stretch', value: 'stretch' },
      { name: 'Flex Start', value: 'flex-start' },
      { name: 'Flex End', value: 'flex-end' },
      { name: 'Center', value: 'center' },
      { name: 'Baseline', value: 'baseline' },
    ],
    condition: (styles: Record<string, string>) => styles.display === 'flex' || styles.display === 'inline-flex',
  },
  {
    label: 'Align Content',
    key: 'align-content',
    options: [
      { name: 'Stretch', value: 'stretch' },
      { name: 'Flex Start', value: 'flex-start' },
      { name: 'Flex End', value: 'flex-end' },
      { name: 'Center', value: 'center' },
      { name: 'Space Between', value: 'space-between' },
      { name: 'Space Around', value: 'space-around' },
    ],
    condition: (styles: Record<string, string>) => styles.display === 'flex' || styles.display === 'inline-flex',
  },
  {
    label: 'Gap',
    key: 'gap',
    condition: (styles: Record<string, string>, showGap: boolean) =>
      showGap && (styles.display === 'flex' || styles.display === 'inline-flex'),
    showSwitch: true,
  },
  {
    label: 'Row Gap',
    key: 'row-gap',
    condition: (styles: Record<string, string>, showGap: boolean) =>
      !showGap && (styles.display === 'flex' || styles.display === 'inline-flex'),
    showSwitch: true,
  },
  {
    label: 'Column Gap',
    key: 'column-gap',
    condition: (styles: Record<string, string>, showGap: boolean) =>
      !showGap && (styles.display === 'flex' || styles.display === 'inline-flex'),
  },
];

export const fontWeights = [
  {
    name: '100 - Thin',
    value: '100',
  },
  {
    name: '200 - Extra Light',
    value: '200',
  },
  {
    name: '300 - Light',
    value: '300',
  },
  {
    name: '400 - Regular',
    value: '400',
  },
  {
    name: '500 - Medium',
    value: '500',
  },
  {
    name: '600 - Semi Bold',
    value: '600',
  },
  {
    name: '700 - Bold',
    value: '700',
  },
  {
    name: '800 - Extra Bold',
    value: '800',
  },
  {
    name: '900 - Black',
    value: '900',
  },
];

export const positions = [
  {
    name: 'Static',
    value: 'static',
  },
  {
    name: 'Relative',
    value: 'relative',
  },
  {
    name: 'Absolute',
    value: 'absolute',
  },
  {
    name: 'Fixed',
    value: 'fixed',
  },
  {
    name: 'Sticky',
    value: 'sticky',
  },
];

export const fontFamilies = [
  {
    name: 'Arial',
    value: 'Arial, sans-serif',
  },
  {
    name: 'Helvetica',
    value: 'Helvetica, sans-serif',
  },
  {
    name: 'Times New Roman',
    value: 'Times New Roman, serif',
  },
  {
    name: 'Courier New',
    value: 'Courier New, monospace',
  },
  {
    name: 'Verdana',
    value: 'Verdana, sans-serif',
  },
  {
    name: 'Georgia',
    value: 'Georgia, serif',
  },
  {
    name: 'Palatino',
    value: 'Palatino, serif',
  },
  {
    name: 'Garamond',
    value: 'Garamond, serif',
  },
  {
    name: 'Bookman',
    value: 'Bookman, serif',
  },
  {
    name: 'Comic Sans MS',
    value: 'Comic Sans MS, cursive',
  },
  {
    name: 'Trebuchet MS',
    value: 'Trebuchet MS, sans-serif',
  },
  {
    name: 'Arial Black',
    value: 'Arial Black, sans-serif',
  },
  {
    name: 'Impact',
    value: 'Impact, sans-serif',
  },
];

export const textAlignments = [
  { name: 'Left', value: 'left' },
  { name: 'Center', value: 'center' },
  { name: 'Right', value: 'right' },
  { name: 'Justify', value: 'justify' },
];

export const verticalAlignments = [
  { name: 'Baseline', value: 'baseline' },
  { name: 'Sub', value: 'sub' },
  { name: 'Super', value: 'super' },
  { name: 'Top', value: 'top' },
  { name: 'Text Top', value: 'text-top' },
  { name: 'Middle', value: 'middle' },
  { name: 'Bottom', value: 'bottom' },
  { name: 'Text Bottom', value: 'text-bottom' },
];

export const textTransforms = [
  { name: 'None', value: 'none' },
  { name: 'Capitalize', value: 'capitalize' },
  { name: 'Uppercase', value: 'uppercase' },
  { name: 'Lowercase', value: 'lowercase' },
];

export const textDirections = [
  { name: 'LTR', value: 'ltr' },
  { name: 'RTL', value: 'rtl' },
];

export const textDecorations = [
  { name: 'None', value: 'none' },
  { name: 'Underline', value: 'underline' },
  { name: 'Overline', value: 'overline' },
  { name: 'Line Through', value: 'line-through' },
];

export const textBreakings = [
  { name: 'Normal', value: 'normal' },
  { name: 'Break All', value: 'break-all' },
  { name: 'Keep All', value: 'keep-all' },
  { name: 'Break Word', value: 'break-word' },
];
