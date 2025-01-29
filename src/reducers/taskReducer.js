/* eslint-disable no-case-declarations */
// src/reducers/taskReducer.js

export const initialState = {
    tasks: {
        todo: [],
        onProgress: [],
        done: [],
        revised: [],
    },
    showModal: false,
};

export function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.category]: [
                        ...state.tasks[action.payload.category],
                        action.payload.task,
                    ],
                },
            };
        case 'TOGGLE_MODAL':
            return {
                ...state,
                showModal: !state.showModal,
            };
        case 'DELETE_TASK':
            const updatedTasks = Object.keys(state.tasks).reduce((acc, category) => {
                acc[category] = state.tasks[category].filter(task => task.id !== action.payload);
                return acc;
            }, {});
            return {
                ...state,
                tasks: updatedTasks,
            };
        case 'SORT_TASKS':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.category]: [...state.tasks[action.payload.category]].sort((a, b) =>
                        new Date(b.dueDate) - new Date(a.dueDate)
                    ),
                },
            };
        case 'EDIT_TASK':
            if (action.payload.task.category !== action.payload.oldCategory) {
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [action.payload.oldCategory]: state.tasks[action.payload.oldCategory].filter(
                            task => task.id !== action.payload.task.id
                        ),
                        [action.payload.task.category]: [
                            ...state.tasks[action.payload.task.category],
                            action.payload.task,
                        ],
                    },
                };
            } else {
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [action.payload.task.category]: state.tasks[action.payload.task.category].map((task) =>
                            task.id === action.payload.task.id ? action.payload.task : task
                        ),
                    },
                };
            }
        case 'SET_TASK_FOR_EDIT':
            return {
                ...state,
                taskForEdit: action.payload.task,
                showModal: true,
            };
        case 'RESET_TASK_FOR_EDIT':
            return {
                ...state,
                taskForEdit: null,
            };
        default:
            return state;
    }
}
