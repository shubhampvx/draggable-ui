import React, { createContext, useContext, useReducer } from 'react';

interface Element {
  id: string;
  type: string;
  content: string;
  styles: Record<string, string>;
  children?: Element[];
}

interface BuilderState {
  elements: Element[];
  selectedElement: Element | null;
}

type BuilderAction =
  | { type: 'ADD_ELEMENT'; payload: Element }
  | { type: 'UPDATE_ELEMENT'; payload: { elementId: string; updates: Partial<Element> } }
  | { type: 'SET_SELECTED_ELEMENT'; payload: Element | null }
  | { type: 'DELETE_ELEMENT'; payload: string }
  | { type: 'SET_ELEMENTS'; payload: Element[] };

const initialState: BuilderState = {
  elements: [],
  selectedElement: null,
};

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    case 'UPDATE_ELEMENT':
      const updateElement = (elements: Element[]): Element[] => {
        return elements.map((element) =>
          element.id === action.payload.elementId
            ? { ...element, ...action.payload.updates, styles: { ...element.styles, ...action.payload.updates.styles } }
            : { ...element, children: updateElement(element.children || []) }
        );
      };
      return {
        ...state,
        elements: updateElement(state.elements),
      };
    case 'DELETE_ELEMENT':
      const deleteElement = (elements: Element[], elementId: string): Element[] => {
        return elements
          .filter((element) => element.id !== elementId)
          .map((element) => ({
            ...element,
            children: deleteElement(element.children || [], elementId),
          }));
      };
      return {
        ...state,
        elements: deleteElement(state.elements, action.payload),
        selectedElement: state.selectedElement?.id === action.payload ? null : state.selectedElement,
      };
    case 'SET_SELECTED_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload,
      };
    case 'SET_ELEMENTS':
      return {
        ...state,
        elements: action.payload,
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
