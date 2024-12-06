import React from 'react';
import { Outlet } from 'react-router-dom';
import { ElementsPanel } from '../SideBar/ElementsPanel';
import { PropertyPanel } from '../PropertyPanel/PropertyPanel';
import { CodePanel } from '../Canvas/CodePanel';
import { useBuilder } from '../../context/BuilderContext';

export const RightSideBar: React.FC = () => {
  const [showCode, setShowCode] = React.useState(false);
  const { state } = useBuilder();

  return (
    <div className="container-fluid h-100">
      <div className="d-flex row h-100">
        <div className="col-3 border-end" style={{ width: '250px' }}>
          <ElementsPanel />
        </div>
        <div className="col">
          {state.elements.length > 0 && (
            <button onClick={() => setShowCode((prev) => !prev)}>{showCode ? 'Hide Code' : 'Show Code'}</button>
          )}
          {showCode ? <CodePanel /> : <Outlet />}
        </div>
        <div className="col border-start" style={{ width: '300px' }}>
          <PropertyPanel />
        </div>
      </div>
    </div>
  );
};
