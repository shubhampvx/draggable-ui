import { useState, useEffect } from 'react';
import { Element } from '../types';
import { useBuilder } from '../context/BuilderContext';

const useElementStyles = (selectedElement: Element) => {
  const { dispatch } = useBuilder();
  const [localStyles, setLocalStyles] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedElement) {
      setLocalStyles(selectedElement.styles || {});
    }
  }, [selectedElement]);

  const handleStyleChange = (styleName: string, value: string) => {
    setLocalStyles((prevStyles: Record<string, string>) => ({
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

  return { localStyles, setLocalStyles, handleStyleChange };
};

export default useElementStyles;
