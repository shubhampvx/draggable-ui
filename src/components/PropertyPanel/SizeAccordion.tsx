import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import UnitSelector from './UnitSelector';

type Props = {
  localStyles: Record<string, string>;
  handleStyleChange: (key: string, value: string) => void;
};

const SizeAccordion = ({ localStyles, handleStyleChange }: Props) => {
  const [units, setUnits] = useState<Record<string, string>>({
    width: 'px',
    'min-width': 'px',
    'max-width': 'px',
    height: 'px',
    'min-height': 'px',
    'max-height': 'px',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    const isSelect = e.target.tagName === 'SELECT';
    const unit = isSelect ? e.target.value : units[key];
    const value = isSelect ? localStyles[key]?.replace(/[a-z%]/g, '') || '' : e.target.value;

    if (isSelect) {
      setUnits((prevUnits) => ({ ...prevUnits, [key]: unit }));
    }

    handleStyleChange(key, value + unit);
  };

  const renderInputGroup = (label: string, key: string) => (
    <div className="mb-3" key={key}>
      <div>
        <label className="form-label">{label}</label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            value={localStyles[key] ? parseFloat(localStyles[key]) : ''}
            onChange={(e) => handleChange(e, key)}
            min={0}
          />
          <UnitSelector value={units[key]} onChange={(e) => handleChange(e, key)} />
        </div>
      </div>
    </div>
  );

  const sizeProperties = [
    { label: 'Width', key: 'width' },
    { label: 'Height', key: 'height' },
    { label: 'Min Width', key: 'min-width' },
    { label: 'Min Height', key: 'min-height' },
    { label: 'Max Width', key: 'max-width' },
    { label: 'Max Height', key: 'max-height' },
  ];

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Size</Accordion.Header>
        <Accordion.Body>
          <div className="row">
            {sizeProperties.map(({ label, key }) => (
              <div className="col-6" key={key}>
                {renderInputGroup(label, key)}
              </div>
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SizeAccordion;
