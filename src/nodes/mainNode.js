import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const MainNode = ({ id, data, type, children, handlePositions,style }) => {
  const [nodeData, setNodeData] = useState(data);

  const handleChange = (field, value) => {
    setNodeData({ ...nodeData, [field]: value });
  };

  return (
    <div className="bg-purple-100 rounded-lg shadow-md overflow-hidden border border-purple-300 " style={style}>
      {handlePositions.left.map((handle, index) => (
        <>
          <Handle
            key={`${id}-${handle.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={{ top: `${handle.top}%` }}
            className="w-3 h-3 bg-purple-500"

          />

          
        </>
      ))}
      {handlePositions.right.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{ top: `${handle.top}%` }}
          className="w-3 h-3 bg-purple-500"
        />
      ))}
      <div className="p-4">
        <div className="text-lg font-semibold text-purple-800 mb-2">{type}</div>
        {children(handleChange, nodeData)}
      </div>
    </div>
  );
};

export default MainNode;