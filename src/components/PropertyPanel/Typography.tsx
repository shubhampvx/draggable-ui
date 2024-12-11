import { Accordion } from 'react-bootstrap';
import {
  fontFamilies,
  fontWeights,
  textAlignments,
  verticalAlignments,
  textTransforms,
  textDirections,
  textDecorations,
  textBreakings,
} from './constants';

type Props = {
  localStyles: Record<string, string>;
  handleStyleChange: (key: string, value: string) => void;
};

const typographyProperties = [
  {
    label: 'Font Size',
    key: 'font-size',
    type: 'number',
    unit: 'px',
  },
  {
    label: 'Font Weight',
    key: 'font-weight',
    type: 'select',
    options: fontWeights,
  },
  {
    label: 'Font Family',
    key: 'font-family',
    type: 'select',
    options: fontFamilies,
  },
  {
    label: 'Text Align',
    key: 'text-align',
    type: 'select',
    options: textAlignments,
  },
  {
    label: 'Vertical Align',
    key: 'vertical-align',
    type: 'select',
    options: verticalAlignments,
  },
  {
    label: 'Text Transform',
    key: 'text-transform',
    type: 'select',
    options: textTransforms,
  },
  {
    label: 'Text Direction',
    key: 'direction',
    type: 'select',
    options: textDirections,
  },
  {
    label: 'Text Decoration',
    key: 'text-decoration',
    type: 'select',
    options: textDecorations,
  },
  {
    label: 'Text Breaking',
    key: 'word-break',
    type: 'select',
    options: textBreakings,
  },
];

const Typography = ({ localStyles, handleStyleChange }: Props) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Typography</Accordion.Header>
        <Accordion.Body>
          {typographyProperties.map((property) => (
            <div className="mb-3" key={property.key}>
              <label className="form-label">{property.label}</label>
              {property.type === 'number' ? (
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={localStyles[property.key] ? parseInt(localStyles[property.key]) : ''}
                    onChange={(e) => handleStyleChange(property.key, e.target.value + (property.unit || ''))}
                    min={0}
                  />
                  {property.unit && <div className="input-group-text">{property.unit}</div>}
                </div>
              ) : (
                <select
                  className="form-select"
                  value={localStyles[property.key] || ''}
                  onChange={(e) => handleStyleChange(property.key, e.target.value)}
                >
                  {property.options &&
                    property.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </select>
              )}
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Typography;
