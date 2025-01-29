// src/components/ProjectContent.js
import { useContext, useReducer } from "react";
import AddSvg from "./AddSvg";
import Done from "./Done";
import OnProgress from "./OnProgress";
import Revised from "./Revised";
import Todo from "./Todo";
import AddTaskModal from "./AddTaskModal";
import { taskReducer, initialState } from "../reducers/taskReducer";
import { SearchContext } from "../contexts/SearchContext";

const ProjectContent = () => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const { searchTerm } = useContext(SearchContext);

    const filterTasks = (tasks) => {
        if (!searchTerm) return tasks;
        const filtered = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered;
    };

    return (
        <div>
            <div className="mx-auto max-w-7xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Projectify</h2>
                    <div className="flex space-x-2">
                        <button
                            className="flex items-center rounded-md bg-gray-700 px-4 py-2 text-white"
                            onClick={() => {
                                dispatch({ type: 'RESET_TASK_FOR_EDIT' });
                                dispatch({ type: 'TOGGLE_MODAL' });
                            }}
                        >
                            <AddSvg />
                            Add
                        </button>
                    </div>
                </div>

                <div className="-mx-2 mb-6 flex flex-wrap">
                    <Todo tasks={filterTasks(state.tasks.todo)} dispatch={dispatch} />
                    <OnProgress tasks={filterTasks(state.tasks.onProgress)} dispatch={dispatch} />
                    <Done tasks={filterTasks(state.tasks.done)} dispatch={dispatch} />
                    <Revised tasks={filterTasks(state.tasks.revised)} dispatch={dispatch} />
                </div>
            </div>
            {state.showModal && <AddTaskModal dispatch={dispatch} taskForEdit={state.taskForEdit} />}
        </div>
    );
};

export default ProjectContent;
