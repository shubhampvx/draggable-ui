import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import BorderAccordion from './BorderAccordion';
import SpaceAccordion from './SpaceAccordion';
import SizeAccordion from './SizeAccordion';
import Typography from './Typography';
import Position from './Position';
import Layout from './Layout';
import { useElementContent, useElementStyles } from '../../hooks';

export const PropertyPanel: React.FC = () => {
  const { state } = useBuilder();
  const selectedElement = state.selectedElement;
  const { localStyles, setLocalStyles, handleStyleChange } = useElementStyles(selectedElement!);
  const { link, content, handleContentChange, handleLinkChange, handleDelete } = useElementContent(selectedElement!);

  if (!selectedElement) {
    return <div className="p-3">Select an element to edit its properties</div>;
  }

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
        <input type="text" className="form-control" value={content} onChange={handleContentChange} />
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
        <Layout localStyles={localStyles} handleStyleChange={handleStyleChange} setLocalStyles={setLocalStyles} />
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
        <BorderAccordion localStyles={localStyles} handleStyleChange={handleStyleChange} />
      </div>
    </div>
  );
};
