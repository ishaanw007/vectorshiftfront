import React from 'react';
import MainNode from './mainNode';

export const InputNode = ({ id, data }) => {
  return (
    <MainNode
      id={id}
      handlePositions={{ left: [], right: [{ id: 'value', top: 50 }] }}
      data={data}
    >
      {(handleChange, nodeData) => (
        <div>
          <div className="mb-2">
            <span className="text-lg font-semibold text-purple-800">Input</span>
          </div>
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-purple-700">Name:</span>
              <input
                type="text"
                value={nodeData.inputName || ''}
                onChange={(e) => handleChange('inputName', e.target.value)}
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-purple-700">Type:</span>
              <select
                value={nodeData.inputType || 'Text'}
                onChange={(e) => handleChange('inputType', e.target.value)}
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              >
                <option value="Text">Text</option>
                <option value="File">File</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </MainNode>
  );
};