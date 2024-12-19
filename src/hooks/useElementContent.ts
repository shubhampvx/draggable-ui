import { useState, useEffect } from 'react';
import { Element } from '../types';
import { useBuilder } from '../context/BuilderContext';

const useElementContent = (selectedElement: Element) => {
  const { dispatch } = useBuilder();
  const [content, setContent] = useState<string>(selectedElement?.content || '');
  const [link, setLink] = useState<string>(selectedElement?.href || '');

  useEffect(() => {
    if (selectedElement) {
      setContent(selectedElement.content || '');
      setLink(selectedElement.href || '');
    }
  }, [selectedElement]);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    if (selectedElement) {
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: { elementId: selectedElement.id, updates: { content: e.target.value } },
      });
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (selectedElement) {
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: { elementId: selectedElement.id, updates: { href: e.target.value } },
      });
    }
  };

  const handleDelete = () => {
    if (selectedElement) {
      dispatch({ type: 'DELETE_ELEMENT', payload: selectedElement.id });
    }
  };

  return { content, link, handleContentChange, handleLinkChange, handleDelete };
};

export default useElementContent;
