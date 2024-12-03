import React, { createContext, useContext, useReducer } from 'react';
import { Element, Section } from '../types';

interface BuilderState {
  sections: Section[];
  selectedElement: Element | null;
}

type BuilderAction =
  | { type: 'ADD_SECTION'; payload: Section }
  | { type: 'REMOVE_SECTION'; payload: string }
  | { type: 'UPDATE_ELEMENT'; payload: { elementId: string; updates: Partial<Element> } }
  | { type: 'SET_SELECTED_ELEMENT'; payload: Element | null }
  | { type: 'ADD_ELEMENT_TO_SECTION'; payload: { sectionId: string; element: Element } };
const initialState: BuilderState = {
  sections: [
    { id: 'hero-section', type: 'hero', elements: [] },
    { id: 'features-section', type: 'features', elements: [] },
  ],
  selectedElement: null,
};

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'ADD_SECTION':
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };
    case 'REMOVE_SECTION':
      return {
        ...state,
        sections: state.sections.filter((section) => section.id !== action.payload),
      };
    case 'UPDATE_ELEMENT':
      return {
        ...state,
        sections: state.sections.map((section) => ({
          ...section,
          elements: section.elements.map((element) =>
            element.id === action.payload.elementId ? { ...element, ...action.payload.updates } : element
          ),
        })),
      };
    case 'SET_SELECTED_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload,
      };
    case 'ADD_ELEMENT_TO_SECTION':
      return {
        ...state,
        sections: state.sections.map((section) =>
          section.id === action.payload.sectionId
            ? { ...section, elements: [...section.elements, action.payload.element] }
            : section
        ),
      };
    default:
      return state;
  }
};

const BuilderContext = createContext<{
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
} | null>(null);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  return <BuilderContext.Provider value={{ state, dispatch }}>{children}</BuilderContext.Provider>;
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
