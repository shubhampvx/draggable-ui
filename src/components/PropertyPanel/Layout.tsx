import { Accordion, Form } from 'react-bootstrap';
import { layoutProperties } from './constants';
import React from 'react';

type Props = {
  localStyles: Record<string, string>;
  handleStyleChange: (key: string, value: string) => void;
  setLocalStyles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const Layout = ({ localStyles, handleStyleChange, setLocalStyles }: Props) => {
  const [gapSwitch, setGapSwitch] = React.useState(true);
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Layout</Accordion.Header>
        <Accordion.Body>
          {layoutProperties.map((property) => {
            if (property.condition && !property.condition(localStyles, gapSwitch)) {
              return null;
            }
            return (
              <React.Fragment key={property.key}>
                {property.showSwitch && (
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Even padding for all sides"
                      checked={gapSwitch}
                      onChange={(e) => {
                        setGapSwitch(e.target.checked);
                        setLocalStyles((prevStyles) => ({
                          ...prevStyles,
                          gap: '',
                          'column-gap': '',
                          'row-gap': '',
                        }));
                      }}
                    />
                  </Form>
                )}
                <div className="mb-3" key={property.key}>
                  <label className="form-label">{property.label}</label>
                  {property.options ? (
                    <select
                      className="form-select"
                      value={localStyles[property.key] || ''}
                      onChange={(e) => handleStyleChange(property.key, e.target.value)}
                    >
                      {property.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={localStyles[property.key] || ''}
                      onChange={(e) => handleStyleChange(property.key, e.target.value)}
                    />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Layout;
