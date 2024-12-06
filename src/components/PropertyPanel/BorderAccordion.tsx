import { Accordion } from 'react-bootstrap';

type Props = {
  localStyles: Record<string, string>;
  handleStyleChange: (key: string, value: string) => void;
  borderStyle: string;
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
                value={props.borderStyle}
                onChange={(e) => props.handleStyleChange('borderStyle', e.target.value)}
              >
                <option value="none">None</option>
                <option value="solid">Solid</option>
                <option value="dotted">Dotted</option>
                <option value="dashed">Dashed</option>
              </select>
            </div>
            <div>
              <label className="form-label">Border Color</label>
              <input
                type="color"
                className="form-control form-control-color"
                value={props.localStyles.borderColor || '#0000'}
                onChange={(e) => props.handleStyleChange('borderColor', e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Border Width</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={props.localStyles.borderWidth ? parseFloat(props.localStyles.borderWidth) : ''}
                onChange={(e) => props.handleStyleChange('borderWidth', e.target.value + 'px')}
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
                value={props.localStyles.borderRadius ? parseFloat(props.localStyles.borderRadius) : ''}
                onChange={(e) => props.handleStyleChange('borderRadius', e.target.value + 'px')}
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
