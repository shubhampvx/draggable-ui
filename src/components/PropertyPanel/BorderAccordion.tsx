import { Accordion } from 'react-bootstrap';
import { borderTypes } from './constants';

type Props = {
  localStyles: Record<string, string>;
  handleStyleChange: (key: string, value: string) => void;
};

const BorderAccordion = (props: Props) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Border</Accordion.Header>
        <Accordion.Body>
          <div className="d-flex align-items-center justify-content-between mb-3 w-50">
            <div>
              <label className="form-label">Border Style</label>
              <select
                className="form-select"
                value={props.localStyles['border-style'] || 'none'}
                onChange={(e) => props.handleStyleChange('border-style', e.target.value)}
              >
                {borderTypes.map((item) => (
                  <option key={item.label} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Border Color</label>
              <input
                type="color"
                className="form-control form-control-color"
                value={props.localStyles['border-color'] || '#0000'}
                onChange={(e) => props.handleStyleChange('border-color', e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Border Width</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={props.localStyles['border-width'] ? parseFloat(props.localStyles['border-width']) : ''}
                onChange={(e) => props.handleStyleChange('border-width', e.target.value + 'px')}
                min={0}
              />
              <div className="input-group-text">px</div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Border Radius</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={props.localStyles['border-radius'] ? parseFloat(props.localStyles['border-radius']) : ''}
                onChange={(e) => props.handleStyleChange('border-radius', e.target.value + 'px')}
                min={0}
              />
              <div className="input-group-text">px</div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default BorderAccordion;
