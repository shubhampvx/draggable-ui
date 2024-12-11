import React, { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';

type Props = {
  localStyles: Record<string, string>;
  setLocalStyles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleStyleChange: (key: string, value: string) => void;
};

const SpaceAccordion = ({ localStyles, setLocalStyles, handleStyleChange }: Props) => {
  const [marginSwitch, setMarginSwitch] = useState(true);
  const [paddingSwitch, setPaddingSwitch] = useState(true);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Space</Accordion.Header>
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
                  setLocalStyles((prevStyles) => ({
                    ...prevStyles,
                    margin: '',
                    'margin-top': '',
                    'margin-right': '',
                    'margin-bottom': '',
                    'margin-left': '',
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
                    value={localStyles.margin ? parseFloat(localStyles.margin) : ''}
                    onChange={(e) => handleStyleChange('margin', e.target.value + 'px')}
                    min={0}
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
                        value={localStyles['margin-top'] ? parseFloat(localStyles['margin-top']) : ''}
                        onChange={(e) => handleStyleChange('margin-top', e.target.value + 'px')}
                        min={0}
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
                        value={localStyles['margin-right'] ? parseFloat(localStyles['margin-right']) : ''}
                        onChange={(e) => handleStyleChange('margin-right', e.target.value + 'px')}
                        min={0}
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
                        value={localStyles['margin-bottom'] ? parseFloat(localStyles['margin-bottom']) : ''}
                        onChange={(e) => handleStyleChange('margin-bottom', e.target.value + 'px')}
                        min={0}
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
                        value={localStyles['margin-left'] ? parseFloat(localStyles['margin-left']) : ''}
                        onChange={(e) => handleStyleChange('margin-left', e.target.value + 'px')}
                        min={0}
                      />
                      <div className="input-group-text">px</div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <div>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Even padding for all sides"
                checked={paddingSwitch}
                onChange={(e) => {
                  setPaddingSwitch(e.target.checked);
                  setLocalStyles((prevStyles) => ({
                    ...prevStyles,
                    padding: '',
                    'padding-top': '',
                    'padding-right': '',
                    'padding-bottom': '',
                    'padding-left': '',
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
                    value={localStyles.padding ? parseFloat(localStyles.padding) : ''}
                    onChange={(e) => handleStyleChange('padding', e.target.value + 'px')}
                    min={0}
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
                        value={localStyles['padding-top'] ? parseFloat(localStyles['padding-top']) : ''}
                        onChange={(e) => handleStyleChange('padding-top', e.target.value + 'px')}
                        min={0}
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
                        value={localStyles['padding-right'] ? parseFloat(localStyles['padding-right']) : ''}
                        onChange={(e) => handleStyleChange('padding-right', e.target.value + 'px')}
                        min={0}
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
                        value={localStyles['padding-bottom'] ? parseFloat(localStyles['padding-bottom']) : ''}
                        onChange={(e) => handleStyleChange('padding-bottom', e.target.value + 'px')}
                        min={0}
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
                        value={localStyles['padding-left'] ? parseFloat(localStyles['padding-left']) : ''}
                        onChange={(e) => handleStyleChange('padding-left', e.target.value + 'px')}
                        min={0}
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

export default SpaceAccordion;
