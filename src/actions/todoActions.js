import { todoActionNames } from '~/constants';
import { config } from '~/constants';
import axiosServiceCreator from '~/common';

const todoAxiosService = axiosServiceCreator.createService(config.BASE_API_URL_NODE_SERVER, config.END_POINTS.todos);

// FETCH Todos
export const fetchTodoRequest = (setOnCallingApi) => {
    return async (dispatch) => {
        setOnCallingApi(true);
        // fake delay
        // setTimeout(async () => {
            const res = await todoAxiosService.get();
            console.log(res);
            dispatch(fetchTodo(res.data));
            setOnCallingApi(false);
        // }, 200);
    };
};
export const fetchTodo = (todos) => {
    return {
        type: todoActionNames.FETCH,
        payload: {
            todos,
        },
    };
};

export const addTodoRequest = (setOnCallingApi, title) => {
    return async (dispatch) => {
        setOnCallingApi(true);
        // fake delay
        // setTimeout(async () => {
            const res = await todoAxiosService.post({
                body: {
                    title,
                    completed: false,
                },
            });
            if (res.status === 201) {
                // OK
                dispatch(addTodo(res.data));
            }
            setOnCallingApi(false);
        // }, 200);
    };
};
export const addTodo = (todo) => {
    return {
        type: todoActionNames.ADD,
        payload: todo,
    };
};

export const removeTodoRequest = (setOnCallingApi, id) => {
    return async (dispatch) => {
        setOnCallingApi(true);
        // fake delay
        // setTimeout(async () => {
            const res = await todoAxiosService.delete({
                paramPath: id,
            });
            if (res.status === 200) {
                // OK
                dispatch(removeTodo(id));
            }
            setOnCallingApi(false);
        // }, 200);
    };
};
export const removeTodo = (id) => {
    return {
        type: todoActionNames.REMOVE,
        payload: {
            id,
        },
    };
};

export const editEndTodoRequest = (setOnCallingApi, editId, newTitle) => {
    return async (dispatch) => {
        setOnCallingApi(true);
        // fake delay
        // setTimeout(async () => {
            let res;
            if (newTitle) {
                res = await todoAxiosService.patch({
                    paramPath: editId,
                    body: {
                        title: newTitle,
                    },
                });

                if (res.status === 200) {
                    // OK
                    dispatch(editEndTodo(editId, newTitle));
                }
            } else {
                res = await todoAxiosService.delete({
                    paramPath: editId,
                });
                if (res.status === 200) {
                    // OK
                    dispatch(removeTodo(editId));
                }
            }

            setOnCallingApi(false);
        // }, 200);
    };
};
export const editEndTodo = (editId, newTitle) => {
    return {
        type: todoActionNames.EDIT_END,
        payload: {
            editId,
            newTitle,
        },
    };
};

export const toggleTodoRequest = (setOnCallingApi, id, checked) => {
    return async (dispatch) => {
        setOnCallingApi(true);
        // fake delay
        // setTimeout(async () => {
            const res = await todoAxiosService.patch({
                paramPath: id,
                body: {
                    completed: checked,
                },
            });
            if (res.status === 200) {
                // OK
                dispatch(toggleTodo(id, checked));
            }
            setOnCallingApi(false);
        // }, 200);
    };
};
export const toggleTodo = (id, checked) => {
    return {
        type: todoActionNames.TOGGLE,
        payload: {
            id,
            checked,
        },
    };
};

export const toggleAllTodoRequest = (setOnCallingApi, ids, checked) => {
    return async (dispatch) => {
        setOnCallingApi(true);
        // fake delay
        // setTimeout(async () => {
        let successIds = [];
        // all one by one patch request
        for (const id of ids) {
            const res = await todoAxiosService.patch({
                paramPath: id,
                body: {
                    completed: checked,
                },
            });
            res.status === 200 && successIds.push(id);
        }

        if (successIds.length > 0) {
            // OK
            dispatch(toggleAllTodo(successIds, checked));
        }

        setOnCallingApi(false);
        // }, 200)
    };
};
export const toggleAllTodo = (ids, checked) => {
    return {
        type: todoActionNames.TOGGLE_ALL,
        payload: {
            ids,
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

export const clearCompletedTodoRequest = (setOnCallingApi, ids) => {
    return async (dispatch) => {
        setOnCallingApi(true);
        // fake delay
        // setTimeout(async () => {
            let successIds = [];
            // all one by one patch request
            for (const id of ids) {
                const res = await todoAxiosService.delete({
                    paramPath: id,
                });
                res.status === 200 && successIds.push(id);
            }

            if (successIds.length > 0) {
                // OK
                dispatch(clearCompletedTodo(successIds));
            }

            setOnCallingApi(false);
        // }, 200);
    };
};
export const clearCompletedTodo = (ids) => {
    return {
        type: todoActionNames.CLEAR_COMPLETED,
        payload: {
            ids,
        },
    };
};
