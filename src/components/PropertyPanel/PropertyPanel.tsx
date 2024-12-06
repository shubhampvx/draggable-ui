import React, { useEffect, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import UnitSelector from './UnitSelector';
import MarginAccordion from './MarginAccordion';
import PaddingAccordion from './PaddingAccordion';
import BorderAccordion from './BorderAccordion';

export const PropertyPanel: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const selectedElement = state.selectedElement;

  const [localStyles, setLocalStyles] = useState<Record<string, string>>({
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: '16px',
    padding: '0px',
    margin: '0px',
    border: 'none',
    borderRadius: '0px',
    width: '100px',
    height: '100px',
    borderWidth: '0px',
    borderStyle: 'solid',
  });
  const [localContent, setLocalContent] = useState<string>('');
  const [widthUnit, setWidthUnit] = useState<string>('px');
  const [heightUnit, setHeightUnit] = useState<string>('px');
  const [borderStyle, setBorderStyle] = useState<string>('none');

  useEffect(() => {
    if (selectedElement) {
      setLocalStyles({
        backgroundColor: selectedElement.styles.backgroundColor || '#ffffff',
        color: selectedElement.styles.color || '#000000',
        fontSize: selectedElement.styles.fontSize || '16px',
        padding: selectedElement.styles.padding || '0px',
        margin: selectedElement.styles.margin || '0px',
        border: selectedElement.styles.border || 'none',
        borderRadius: selectedElement.styles.borderRadius || '0px',
        width: selectedElement.styles.width || 'auto',
        height: selectedElement.styles.height || 'auto',
      });
      setBorderStyle(selectedElement.styles.borderStyle);
      setLocalStyles(selectedElement.styles);
      setLocalContent(selectedElement.content);
      setWidthUnit(selectedElement.styles.width?.replace(/[0-9.]/g, '') || 'px');
      setHeightUnit(selectedElement.styles.height?.replace(/[0-9.]/g, '') || 'px');
    }
  }, [selectedElement]);

  if (!selectedElement) {
    return <div className="p-3">Select an element to edit its properties</div>;
  }

  const handleStyleChange = (styleName: string, value: string) => {
    setLocalStyles((prevStyles) => ({
      ...prevStyles,
      [styleName]: value,
    }));
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementId: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            [styleName]: value,
          },
        },
      },
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalContent(e.target.value);
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementId: selectedElement.id,
        updates: {
          content: e.target.value,
        },
      },
    });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value + widthUnit;
    handleStyleChange('width', value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value + heightUnit;
    handleStyleChange('height', value);
  };

  const handleWidthUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWidthUnit(e.target.value);
    const value = localStyles.width?.replace(/[a-z%]/g, '') + e.target.value;
    handleStyleChange('width', value);
  };

  const handleHeightUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHeightUnit(e.target.value);
    const value = localStyles.height?.replace(/[a-z%]/g, '') + e.target.value;
    handleStyleChange('height', value);
  };

  const handleDelete = () => {
    if (selectedElement) {
      dispatch({ type: 'DELETE_ELEMENT', payload: selectedElement.id });
    }
  };

  return (
    <div
      className="p-3"
      style={{
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <h5 style={{ textTransform: 'capitalize' }}>Edit {selectedElement.type} Style</h5>
      <div className="mb-3">
        <label className="form-label">{selectedElement.type === 'image' ? 'Source' : 'Text'}</label>
        <input type="text" className="form-control" value={localContent} onChange={handleContentChange} />
      </div>
      <div className="d-flex align-items-center justify-content-between mb-3 w-50">
        <div>
          <label className="form-label">Background Color</label>
          <input
            type="color"
            className="form-control form-control-color"
            value={localStyles['background-color'] || '#ffffff'}
            onChange={(e) => handleStyleChange('background-color', e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Text Color</label>
          <input
            type="color"
            className="form-control form-control-color"
            value={localStyles.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Font Size</label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            value={localStyles.fontSize ? parseInt(localStyles.fontSize) : ''}
            onChange={(e) => handleStyleChange('fontSize', e.target.value + 'px')}
          />
          <div className="input-group-text">px</div>
        </div>
      </div>
      <div className="mb-3">
        <PaddingAccordion
          localStyles={localStyles}
          setLocalStyles={setLocalStyles}
          handleStyleChange={handleStyleChange}
        />
      </div>
      <div className="mb-3">
        <MarginAccordion
          localStyles={localStyles}
          setLocalStyles={setLocalStyles}
          handleStyleChange={handleStyleChange}
        />
      </div>
      <div className="mb-3">
        <BorderAccordion localStyles={localStyles} handleStyleChange={handleStyleChange} borderStyle={borderStyle} />
      </div>
      <div className="mt-3 mb-3">
        <label className="form-label">Width</label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            value={localStyles.width ? parseFloat(localStyles.width) : ''}
            onChange={handleWidthChange}
          />
          <UnitSelector value={widthUnit} onChange={handleWidthUnitChange} />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Height</label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            value={parseFloat(localStyles.height)}
            onChange={handleHeightChange}
          />
          <UnitSelector value={heightUnit} onChange={handleHeightUnitChange} />
        </div>
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Element
      </button>
    </div>
  );
};
