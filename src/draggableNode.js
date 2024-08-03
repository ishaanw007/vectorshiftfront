// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`
          bg-purple-100 text-purple-800 
          px-4 py-2 rounded-md shadow-sm
          border border-purple-300
          cursor-grab hover:bg-purple-200 
          transition-colors duration-200
          flex items-center justify-center
          w-24 h-16
        `}
        onDragStart={(event) => onDragStart(event, type)}
        draggable
      >
        <span className="font-medium">{label}</span>
      </div>
    );
  };