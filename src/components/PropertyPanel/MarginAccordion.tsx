import React, { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';

type Props = {
  localStyles: Record<string, string>;
  setLocalStyles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleStyleChange: (key: string, value: string) => void;
};

const MarginAccordion = (props: Props) => {
  const [marginSwitch, setMarginSwitch] = useState(true);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Margin</Accordion.Header>
        <Accordion.Body>
          <div>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Even margin for all sides"
                checked={marginSwitch}
                onChange={(e) => {
                  setMarginSwitch(e.target.checked);
                  props.setLocalStyles((prevStyles) => ({
                    ...prevStyles,
                    margin: '',
                    marginTop: '',
                    marginRight: '',
                    marginBottom: '',
                    marginLeft: '',
                  }));
                }}
              />
            </Form>
            {marginSwitch ? (
              <div className="mt-3 mb-3">
                <label className="form-label">Margin</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={props.localStyles.margin ? parseFloat(props.localStyles.margin) : ''}
                    onChange={(e) => props.handleStyleChange('margin', e.target.value + 'px')}
                  />
                  <div className="input-group-text">px</div>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
                  <div>
                    <label className="form-label">Margin Top</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.marginTop ? parseFloat(props.localStyles.marginTop) : ''}
                        onChange={(e) => props.handleStyleChange('marginTop', e.target.value + 'px')}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Margin Right</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.marginRight ? parseFloat(props.localStyles.marginRight) : ''}
                        onChange={(e) => props.handleStyleChange('marginRight', e.target.value + 'px')}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
                  <div>
                    <label className="form-label">Margin Bottom</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.marginBottom ? parseFloat(props.localStyles.marginBottom) : ''}
                        onChange={(e) => props.handleStyleChange('marginBottom', e.target.value + 'px')}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Margin Left</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.marginLeft ? parseFloat(props.localStyles.marginLeft) : ''}
                        onChange={(e) => props.handleStyleChange('marginLeft', e.target.value + 'px')}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default MarginAccordion;
