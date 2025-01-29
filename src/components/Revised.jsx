/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import DeleteSvg from "./DeleteSvg";
import EditSvg from "./EditSvg";
import SortSvg from "./SortSvg";

/* eslint-disable react/no-unknown-property */
const Revised = ({ tasks, dispatch }) => {
    const handleSort = () => {
        dispatch({ type: 'SORT_TASKS', payload: { category: 'revised' } });
    };

    const handleEdit = (task) => {
        dispatch({ type: 'SET_TASK_FOR_EDIT', payload: { task } });
    };

    const confirmDelete = (taskId) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            dispatch({ type: "DELETE_TASK", payload: taskId });
        }
    };

    return (
        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
            <div className="rounded-lg bg-rose-500 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Revise ({tasks.length})</h3>
                    <button onClick={handleSort}>
                        <SortSvg />
                    </button>
                </div>
                {tasks.length === 0 ? (
                    <p className="text-center text-light font-semibold">
                        Task List is empty!
                    </p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="mb-4 rounded-lg bg-gray-800 p-4">
                            <div className="flex justify-between">
                                <h4 className="mb-2 font-semibold text-rose-500">
                                    {task.title}
                                </h4>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() =>
                                            confirmDelete(task.id)
                                        }
                                    >
                                        <DeleteSvg />
                                    </button>
                                    <button onClick={() => handleEdit(task)}>
                                        <EditSvg />
                                    </button>
                                </div>
                            </div>
                            <p className="mb-2 text-sm text-zinc-200">{task.description}</p>
                            <p className="mt-6 text-xs text-zinc-400">{task.dueDate}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Revised;
