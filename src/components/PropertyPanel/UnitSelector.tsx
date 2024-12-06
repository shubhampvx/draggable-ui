import React from 'react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const UnitSelector = ({ value, onChange }: Props) => {
  return (
    <select className="form-select" value={value} onChange={onChange}>
      <option value="px">px</option>
      <option value="rem">rem</option>
      <option value="em">em</option>
      <option value="%">%</option>
      <option value="vw">vw</option>
      <option value="vh">vh</option>
    </select>
  );
};

export default UnitSelector;
