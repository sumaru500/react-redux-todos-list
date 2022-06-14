import { todoActionNames, todoFilterNames } from '~/constants';
import createStorage from '~/libs/storage';
const storageKeys = {
    root: 'TODOS_KEY',
    keys: {
        todos: 'todos',
    },
};
const storage = createStorage(storageKeys.root);
const initialState = {
    todos: [],
    filter: todoFilterNames.ALL,

    // filter definition on todos
    filters: {
        [todoFilterNames.ALL]: (todo) => true,
        [todoFilterNames.ACTIVE]: (todo) => !todo.completed,
        [todoFilterNames.COMPLETED]: (todo) => todo.completed,
    },
};

const actions = {
    // --------------------------SOCKET actions----------------------------------
    [todoActionNames.INSERT]: (state, insertedTodo) => {
        // ignore self received
        const index = window.utils._.findIndex(state.todos, (todo, index) => todo.id === insertedTodo.id);
        if (index !== -1) return state;
        return actions.add(state, insertedTodo);
    },
    [todoActionNames.DELETE]: (state, id) => {
        // ignore self received
        const index = window.utils._.findIndex(state.todos, (todo, index) => todo.id === id);
        if (index === -1) return state;
        return actions.remove(state, { id });
    },
    [todoActionNames.UPDATE]: (state, { id: editId, title: newTitle, completed: newCompleted }) => {
        const index = window.utils._.findIndex(state.todos, (todo, index) => todo.id === editId);

        state.todos[index].title = newTitle;
        state.todos[index].completed = newCompleted;
        state = {
            ...state,
            todos: [...state.todos],
        };

        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    // --------------------------UI actions--------------------------------------
    [todoActionNames.FETCH]: (state, { todos }) => {
        state = {
            ...state,
            todos,
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.ADD]: (state, todo) => {
        state = {
            ...state,
            todos: [...state.todos, todo],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.REMOVE]: (state, { id }) => {
        const index = window.utils._.findIndex(state.todos, (todo, index) => todo.id === id);
        state.todos.splice(index, 1);
        state = {
            ...state,
            todos: [...state.todos],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.EDIT_END]: (state, { editId, newTitle }) => {
        const index = window.utils._.findIndex(state.todos, (todo, index) => todo.id === editId);
        if (newTitle) {
            state.todos[index].title = newTitle;
            state = {
                ...state,
                todos: [...state.todos],
            };
        } else {
            return actions[todoActionNames.REMOVE](state, editId);
        }
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.TOGGLE]: (state, { id, checked }) => {
        const index = state.todos.findIndex((todo, index) => todo.id === id);
        state.todos[index].completed = checked;
        state = {
            ...state,
            todos: [...state.todos],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.TOGGLE_ALL]: (state, { ids, checked }) => {
        state.todos.forEach((todo) => {
            ids.includes(todo.id) && (todo.completed = checked);
        });

        state = {
            ...state,
            todos: [...state.todos],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.FILTER]: (state, { filter }) => {
        state.filter = filter;
        return {
            ...state,
            filter: state.filter,
        };
    },
    [todoActionNames.CLEAR_COMPLETED]: (state, { ids }) => {
        state.todos = state.todos.filter((todo) => !ids.includes(todo.id));
        state = {
            ...state,
            todos: [...state.todos],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
};

const todoReducer = (state = initialState, action) => {
    return actions[action.type] ? actions[action.type](state, action.payload) : state;
};

export default todoReducer;
