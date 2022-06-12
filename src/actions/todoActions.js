import { todoActionNames } from '~/constants';
export const addTodo = (title) => {
    return {
        type: todoActionNames.ADD,
        payload: {
            title,
        },
    };
};
export const removeTodo = (index) => {
    return {
        type: todoActionNames.REMOVE,
        payload: {
            index,
        },
    };
};
export const editEndTodo = (editIndex, newTitle) => {
    return {
        type: todoActionNames.EDIT_END,
        payload: {
            editIndex,
            newTitle,
        },
    };
};
export const toggleTodo = (index) => {
    return {
        type: todoActionNames.TOGGLE,
        payload: {
            index,
        },
    };
};
export const toggleAllTodo = (checked) => {
    return {
        type: todoActionNames.TOGGLE_ALL,
        payload: {
            checked,
        },
    };
};
export const filterTodo = (filter) => {
    return {
        type: todoActionNames.FILTER,
        payload: {
            filter,
        },
    };
};
export const clearCompletedTodo = () => {
    return {
        type: todoActionNames.CLEAR_COMPLETED,
    };
};
