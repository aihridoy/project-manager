/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react/no-unknown-property */
const AddTaskModal = ({ dispatch, taskForEdit }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('todo');

    useEffect(() => {
        if (taskForEdit) {
            setTitle(taskForEdit.title);
            setDescription(taskForEdit.description);
            setDueDate(taskForEdit.dueDate);
            setCategory(taskForEdit.category);
        }
    }, [taskForEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || !dueDate || !category) {
            toast.warn('Please fill all fields', { position: "top-right", autoClose: 3000 });
            return;
        }

        const taskData = {
            id: taskForEdit ? taskForEdit.id : new Date().getTime(),
            title,
            description,
            dueDate,
            category,
        };

        if (taskForEdit) {
            dispatch({ type: 'EDIT_TASK', payload: { task: taskData, oldCategory: taskForEdit.category } });
        } else {
            dispatch({ type: 'ADD_TASK', payload: { task: taskData, category } });
        }

        dispatch({ type: 'TOGGLE_MODAL' });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-white">
            <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl p-6">
                <h2 className="mb-6 text-2xl font-bold text-green-400">{taskForEdit ? 'Edit Task' : 'Create Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="taskName"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Task Name
                        </label>
                        <input
                            type="text"
                            id="taskName"
                            name="taskName"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="dueDate"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="category"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="todo">To-Do</option>
                            <option value="onProgress">On Progress</option>
                            <option value="done">Done</option>
                            <option value="revised">Revised</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => dispatch({ type: 'TOGGLE_MODAL' })}
                            className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            {taskForEdit ? 'Edit Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddTaskModal;
