import React, { useEffect, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import BorderAccordion from './BorderAccordion';
import SpaceAccordion from './SpaceAccordion';
import SizeAccordion from './SizeAccordion';
import Typography from './Typography';
import Position from './Position';
import Layout from './Layout';

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
  const [link, setLink] = useState<string>('');
  const [borderStyle, setBorderStyle] = useState<string>('none');

  useEffect(() => {
    if (selectedElement) {
      setLocalStyles({
        backgroundColor: selectedElement?.styles?.backgroundColor || '#ffffff',
        color: selectedElement?.styles?.color || '#000000',
        fontSize: selectedElement?.styles?.fontSize || '16px',
        padding: selectedElement?.styles?.padding || '0px',
        margin: selectedElement?.styles?.margin || '0px',
        border: selectedElement?.styles?.border || 'none',
        borderRadius: selectedElement?.styles?.borderRadius || '0px',
        width: selectedElement?.styles?.width || 'auto',
        height: selectedElement?.styles?.height || 'auto',
      });
      setBorderStyle(selectedElement?.styles?.['border-style'] || 'none');
      setLocalStyles(selectedElement?.styles || {});
      setLocalContent(selectedElement?.content || '');
      setLink(selectedElement?.href || '');
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
        updates: { styles: { ...selectedElement.styles, [styleName]: value } },
      },
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalContent(e.target.value);
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: { elementId: selectedElement.id, updates: { content: e.target.value } },
    });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: { elementId: selectedElement.id, updates: { href: e.target.value } },
    });
  };

  const handleDelete = () => {
    if (selectedElement) {
      dispatch({ type: 'DELETE_ELEMENT', payload: selectedElement.id });
    }
  };

  return (
    <div className="p-1" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="d-flex flex-row justify-content-between align-items-center mb-1">
        <h5 style={{ textTransform: 'capitalize' }}>Edit {selectedElement.type} Style</h5>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Element
        </button>
      </div>
      <div className="mb-3">
        <label className="form-label">{selectedElement.type === 'image' ? 'Source' : 'Text'}</label>
        <input type="text" className="form-control" value={localContent} onChange={handleContentChange} />
      </div>
      {selectedElement.type === 'a' && (
        <div className="mb-3">
          <label className="form-label">{'Link'}</label>
          <input type="text" className="form-control" value={link} onChange={handleLinkChange} />
        </div>
      )}
      <div className="d-flex align-items-center justify-content-between mb-3">
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
        <Layout localStyles={localStyles} handleStyleChange={handleStyleChange} />
      </div>
      <div className="mb-3">
        <Position localStyles={localStyles} handleStyleChange={handleStyleChange} />
      </div>
      <div className="mb-3">
        <Typography localStyles={localStyles} handleStyleChange={handleStyleChange} />
      </div>
      <div className="mb-3">
        <SpaceAccordion
          localStyles={localStyles}
          setLocalStyles={setLocalStyles}
          handleStyleChange={handleStyleChange}
        />
      </div>
      <div className="mb-3">
        <SizeAccordion localStyles={localStyles} handleStyleChange={handleStyleChange} />
      </div>
      <div className="mb-3">
        <BorderAccordion localStyles={localStyles} handleStyleChange={handleStyleChange} borderStyle={borderStyle} />
      </div>
    </div>
  );
};
