import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainNode from './mainNode';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data.text || '');
  const [variables, setVariables] = useState([]);

  const parseVariables = useCallback((input) => {
    const regex = /\{\{([a-zA-Z_$][0-9a-zA-Z_$]*)\}\}/g;
    const matches = [...input.matchAll(regex)];
    return matches.map(match => match[1]);
  }, []);

  useEffect(() => {
    const newVariables = parseVariables(text);
    setVariables(newVariables);
  }, [text, parseVariables]);

  

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

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
          left: variables.map((v, index) => ({ id: v, top: (index + 1) * 100 / (variables.length + 1) })),
          right: [{ id: 'output', top: 50 }] 
        }}
      >
        {(handleChange, nodeData) => (
          <div className="flex flex-col relative">
            <textarea
              value={text}
              onChange={(e) => {
                handleTextChange(e);
                handleChange('text', e.target.value);
              }}
              className="w-full h-full p-2 text-sm border border-purple-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ height: `${Math.max(60, text.split('\n').length * 20)}px` }}
              />
          </div>
        )}
      </MainNode>
    </div>
  );
};