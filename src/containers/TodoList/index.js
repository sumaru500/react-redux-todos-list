import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';
import TodoItem from '~/components/TodoItem';
import { todoActions } from '~/actions';
import {todoFilterNames} from '~/constants';

const TodoList = ({ todos, filter, filters, todoActions}) => {
    const [checkedAll, setCheckedAll] = useState(todos.every(filters[todoFilterNames.COMPLETED]));
    useEffect(() => {
        setCheckedAll(todos.every(filters[todoFilterNames.COMPLETED]));
    }, [todos, filters]);

    const [isOnCallingApiFetch, setOnCallingApiFetch] = useState(false);
    const [isOnCallingApiToogleAll, setOnCallingApiToogleAll] = useState(false);
    useEffect(() => {
        todoActions.fetchTodoRequest(setOnCallingApiFetch);
    }, []);

    const handleToggleAllTodo = (event) => {
        // dispatch to redux store
        todoActions.toggleAllTodoRequest(setOnCallingApiToogleAll, todos.map(todo=> todo.id), event.target.checked);
    }

    return (
        <React.Fragment>
            {isOnCallingApiToogleAll && <div>Toogleing all...</div>}
            <input id="toggle-all" className="toggle-all" type="checkbox"
                checked={checkedAll}
                onChange={(event) => setCheckedAll(event.target.value)}
                onClick={handleToggleAllTodo}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            {isOnCallingApiFetch && <div>Loading...</div>}
            {!isOnCallingApiFetch && <ul className="todo-list">
                {/* <!-- These are here just to show the structure of the list items --> */}
                {/* <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
                {todos.filter(filters[filter]).map((todo, index) => (
                    <TodoItem 
                        key={index} 
                        index={index} 
                        todo={todo}
                        // editIndex={editIndex} 
                        todoActions={todoActions}>                     
                    </TodoItem>
                ))}
            </ul>}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todoState.todos,
    filter: state.todoState.filter,
    filters: state.todoState.filters,
});

const mapDispatchToProps = (dispatch, props) => ({
    todoActions: bindActionCreators(todoActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
