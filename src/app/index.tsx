import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BuilderProvider } from '../context/BuilderContext';
import Router from './router';

const App: React.FC = () => {
  return (
    <BuilderProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="vh-100 d-flex flex-column">
          <div className="flex-grow-1">
            <Router />
          </div>
        </div>
      </DndProvider>
    </BuilderProvider>
  );
};

export default App;
