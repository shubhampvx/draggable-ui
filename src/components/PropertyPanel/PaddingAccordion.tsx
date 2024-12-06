import React, { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';

type Props = {
  localStyles: Record<string, string>;
  setLocalStyles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleStyleChange: (key: string, value: string) => void;
};

const PaddingAccordion = (props: Props) => {
  const [paddingSwitch, setPaddingSwitch] = useState(true);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Padding</Accordion.Header>
        <Accordion.Body>
          <div>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Even padding for all sides"
                checked={paddingSwitch}
                onChange={(e) => {
                  setPaddingSwitch(e.target.checked);
                  props.setLocalStyles((prevStyles) => ({
                    ...prevStyles,
                    padding: '',
                    paddingTop: '',
                    paddingRight: '',
                    paddingBottom: '',
                    paddingLeft: '',
                  }));
                }}
              />
            </Form>
            {paddingSwitch ? (
              <div className="mt-3 mb-3">
                <label className="form-label">Padding</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={props.localStyles.padding ? parseFloat(props.localStyles.padding) : ''}
                    onChange={(e) => props.handleStyleChange('padding', e.target.value + 'px')}
                  />
                  <div className="input-group-text">px</div>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
                  <div>
                    <label className="form-label">Padding Top</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.paddingTop ? parseFloat(props.localStyles.paddingTop) : ''}
                        onChange={(e) => props.handleStyleChange('paddingTop', e.target.value + 'px')}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Padding Right</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.paddingRight ? parseFloat(props.localStyles.paddingRight) : ''}
                        onChange={(e) => props.handleStyleChange('paddingRight', e.target.value + 'px')}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
                  <div>
                    <label className="form-label">Padding Bottom</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.paddingBottom ? parseFloat(props.localStyles.paddingBottom) : ''}
                        onChange={(e) => props.handleStyleChange('paddingBottom', e.target.value + 'px')}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Padding Left</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={props.localStyles.paddingLeft ? parseFloat(props.localStyles.paddingLeft) : ''}
                        onChange={(e) => props.handleStyleChange('paddingLeft', e.target.value + 'px')}
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

export default PaddingAccordion;
