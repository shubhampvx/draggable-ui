import { Accordion } from 'react-bootstrap';
import { positionAttributes, positions } from './constants';

type Props = {
  localStyles: Record<string, string>;
  handleStyleChange: (key: string, value: string) => void;
};

const Position = ({ localStyles, handleStyleChange }: Props) => {
  const renderInput = (label: string, key: string) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          value={localStyles[key] ? parseFloat(localStyles[key]) : ''}
          onChange={(e) => handleStyleChange(key, e.target.value + 'px')}
        />
        <div className="input-group-text">px</div>
      </div>
    </div>
  );

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Position</Accordion.Header>
        <Accordion.Body>
          <div className="mb-3">
            <label className="form-label">Position</label>
            <select
              className="form-select"
              value={localStyles.position}
              onChange={(e) => handleStyleChange('position', e.target.value)}
            >
              {positions.map((item) => (
                <option key={item.name} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {positionAttributes.map((position) => renderInput(position.name, position.value))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Position;
