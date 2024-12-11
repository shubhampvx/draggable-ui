import { Accordion } from 'react-bootstrap';
import { positions } from './constants';

type Props = {
  localStyles: Record<string, string>;
  handleStyleChange: (key: string, value: string) => void;
};

const Position = ({ localStyles, handleStyleChange }: Props) => {
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Position;
