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
    todos: storage.get(storageKeys.keys.todos) ?? [],
    filter: todoFilterNames.ALL,

    // filter definition on todos
    filters: {
        [todoFilterNames.ALL]: (todo) => true,
        [todoFilterNames.ACTIVE]: (todo) => !todo.completed,
        [todoFilterNames.COMPLETED]: (todo) => todo.completed,
    },
};

const actions = {
    [todoActionNames.ADD]: (state, { title }) => {
        state = {
            ...state,
            todos: [
                ...state.todos,
                {
                    title,
                    completed: false,
                },
            ],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.REMOVE]: (state, { index }) => {
        state.todos.splice(index, 1);
        state = {
            ...state,
            todos: [...state.todos],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.EDIT_END]: (state, { editIndex, newTitle }) => {
        if (newTitle) {
            state.todos[editIndex].title = newTitle;
            state = {
                ...state,
                todos: [...state.todos],
            };
        } else {
            state = actions[todoActionNames.REMOVE](state, editIndex);
        }
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.TOGGLE]: (state, { index }) => {
        state.todos[index].completed = !state.todos[index].completed;
        state = {
            ...state,
            todos: [...state.todos],
        };
        // save to storage
        storage.set(storageKeys.keys.todos, state.todos);
        return state;
    },
    [todoActionNames.TOGGLE_ALL]: (state, { checked }) => {
        state.todos.forEach((todo) => {
            todo.completed = checked;
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
    [todoActionNames.CLEAR_COMPLETED]: (state) => {
        state.todos = state.todos.filter(state.filters[todoFilterNames.ACTIVE]);
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
