import React from 'react';
import MainNode from './mainNode';

export const LLMNode = ({ id, data }) => {
  return (
    <MainNode
      id={id}
      handlePositions={{
        left: [
          { id: 'system', top: 33 },
          { id: 'prompt', top: 66 },
        ],
        right: [{ id: 'response', top: 50 }],
      }}
      data={data}

    >
      {(handleChange, nodeData) => (
        <div >
          <div className="mb-2">
            <span className="text-lg font-semibold text-purple-800">LLM</span>
          </div>
          <div className="text-sm text-purple-600">
            <span>This is a Language Model.</span>
          </div>
          <div className="mt-2 space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-purple-700">Model:</span>
              <select
                value={nodeData.model || 'gpt-3.5-turbo'}
                onChange={(e) => handleChange('model', e.target.value)}
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </MainNode>
  );
};