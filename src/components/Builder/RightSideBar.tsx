import React from 'react';
import { Outlet } from 'react-router-dom';
import { ElementsPanel } from '../SideBar/ElementsPanel';
import { PropertyPanel } from '../PropertyPanel/PropertyPanel';

export const RightSideBar: React.FC = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-3 border-end">
          <ElementsPanel />
        </div>
        <div className="col">
          <Outlet />
        </div>
        <PropertyPanel />
      </div>
    </div>
  );
};
