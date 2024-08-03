// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="bg-purple-800 p-4 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">Pipeline Toolbar</h2>
            <div className="flex flex-wrap gap-4">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};