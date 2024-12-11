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

  const handleSwitchChange = (type: 'margin' | 'padding', checked: boolean) => {
    const setSwitch = type === 'margin' ? setMarginSwitch : setPaddingSwitch;
    setSwitch(checked);
    setLocalStyles((prevStyles) => ({
      ...prevStyles,
      [type]: '',
      [`${type}-top`]: '',
      [`${type}-right`]: '',
      [`${type}-bottom`]: '',
      [`${type}-left`]: '',
    }));
  };

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

  const renderSpaceInputs = (type: 'margin' | 'padding', switchState: boolean) => {
    if (switchState) {
      return renderInput(type.charAt(0).toUpperCase() + type.slice(1), type);
    } else {
      return (
        <>
          {renderInput(`${type.charAt(0).toUpperCase() + type.slice(1)} Top`, `${type}-top`)}
          {renderInput(`${type.charAt(0).toUpperCase() + type.slice(1)} Right`, `${type}-right`)}
          {renderInput(`${type.charAt(0).toUpperCase() + type.slice(1)} Bottom`, `${type}-bottom`)}
          {renderInput(`${type.charAt(0).toUpperCase() + type.slice(1)} Left`, `${type}-left`)}
        </>
      );
    }
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Space</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Check
              type="switch"
              id="margin-switch"
              label="Even margin for all sides"
              checked={marginSwitch}
              onChange={(e) => handleSwitchChange('margin', e.target.checked)}
            />
            {renderSpaceInputs('margin', marginSwitch)}
            <Form.Check
              type="switch"
              id="padding-switch"
              label="Even padding for all sides"
              checked={paddingSwitch}
              onChange={(e) => handleSwitchChange('padding', e.target.checked)}
            />
            {renderSpaceInputs('padding', paddingSwitch)}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SpaceAccordion;
