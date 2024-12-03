import React from 'react';
import { useBuilder } from '../../context/BuilderContext';

export const PropertyPanel: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const selectedElement = state.selectedElement;

  if (!selectedElement) {
    return (
      <div className="col-3 border-start p-3">
        <p className="text-muted">No element selected</p>
      </div>
    );
  }

  const handleStyleChange = (property: string, value: string) => {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementId: selectedElement.id,
        updates: {
          styles: { ...selectedElement.styles, [property]: value },
        },
      },
    });
  };

  return (
    <div className="col-3 border-start p-3">
      <h5 className="mb-4">Properties</h5>
      <div className="mb-3">
        <label className="form-label">Background Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          value={selectedElement.styles?.backgroundColor || '#ffffff'}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Text Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          value={selectedElement.styles?.color || '#000000'}
          onChange={(e) => handleStyleChange('color', e.target.value)}
        />
      </div>
    </div>
  );
};
