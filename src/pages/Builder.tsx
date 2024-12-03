import React from 'react';
import { Canvas } from '../components/Canvas/Canvas';
import { PropertyPanel } from '../components/PropertyPanel/PropertyPanel';
import { ElementsPanel } from '../components/SideBar/ElementsPanel';

export const Builder: React.FC = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-3 border-end">
          <ElementsPanel />
        </div>
        <Canvas />
        <PropertyPanel />
      </div>
    </div>
  );
};
