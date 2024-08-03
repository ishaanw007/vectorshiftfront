// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({ nodes: state.nodes, edges: state.edges }));

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert(`Pipeline Analysis:
                Number of Nodes: ${data.num_nodes}
                Number of Edges: ${data.num_edges}
                Is DAG: ${data.is_dag ? 'Yes' : 'No'}`);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the pipeline.');
        }
    };

    return (
        <div className="flex items-center justify-center mt-4">
            <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200"
            >
                Submit Pipeline
            </button>
        </div>
    );
}