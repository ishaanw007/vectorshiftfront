import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainNode from './mainNode';
import { useUpdateNodeInternals } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data.text || '');
  const [variables, setVariables] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);

  const parseVariables = useCallback((input) => {
    const regex = /\{\{([a-zA-Z_$][0-9a-zA-Z_$]*)\}\}/g;
    const matches = [...input.matchAll(regex)];
    return matches.map(match => match[1]);
  }, []);

  useEffect(() => {
    console.log("kk", id);
    const newVariables = parseVariables(text);
    setVariables(newVariables);
    updateNodeInternals(id); // Inform React Flow of the changes
  }, [text, parseVariables, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [text]);

  return (
    <div className="relative" style={{ width: "200px", height: "200px" }}>
      {variables.map((variable, index) => (
        <div
          key={variable}
          className="absolute text-xs text-purple-600 right-full pr-2 whitespace-nowrap"
          style={{ top: `${(index + 1) * 100 / (variables.length + 1)}%`, transform: 'translateY(-50%)' }}
        >
          {variable}
        </div>
      ))}
      <MainNode
        id={id}
        data={{ ...data, text }}
        type="Text"
        handlePositions={{ 
          left: variables.map((v, index) => ({ id: v, top: (index + 1) * 100 / (variables.length + 1), })),
          right: [{ id: 'output', top: 50 }] 
        }}
      >
        {(handleChange, nodeData) => (
          <div className="flex flex-col relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                handleTextChange(e);
                handleChange('text', e.target.value);
              }}
              className="w-full p-2 text-sm border border-purple-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 overflow-hidden"
              style={{ height: 'auto' }}
            />
          </div>
        )}
      </MainNode>
    </div>
  );
};