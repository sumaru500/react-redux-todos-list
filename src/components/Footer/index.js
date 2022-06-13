import { connect } from 'react-redux';
import { useState } from 'react';
import { todoActions } from '~/actions';
import { todoFilterNames } from '~/constants';

const Footer = ({ todos, filter, filters, filterTodo, clearCompletedTodoRequest }) => {
    const [isOnCallingApiClearCompleted, setOnCallingApiClearCompleted] = useState(false);

    const handleFilterTodo = (event) => {
        // dispatch to redux store
        filterTodo(event.target.dataset.filter);
    }

    const handleClearCompletedTodo = (event) => {
        // dispatch to redux store
        clearCompletedTodoRequest(setOnCallingApiClearCompleted, todos.filter(filters[todoFilterNames.COMPLETED]).map(todo => todo.id));
    }
    
    return (
        <footer className="footer">
            {isOnCallingApiClearCompleted && <div>Deleting completed todo...</div>}
            {/* <!-- This should be `0 items left` by default --> */}
            <span className="todo-count">
                <strong>{todos.filter(filters[todoFilterNames.ACTIVE]).length}</strong> item left
            </span>
            {/* <!-- Remove this if you don't implement routing --> */}
            <ul className="filters">
                {Object.keys(filters).map((filterName, index) => (
                    <li key={index}>
                        <a className={filterName === filter ? "selected" : ""} href="#/"
                        data-filter={filterName}
                        onClick={handleFilterTodo}
                        >
                            {window.utils.toFirstUpperCase(filterName)}
                        </a>
                    </li>
                ))}
            </ul>
            {/* <!-- Hidden if no completed items are left ↓ --> */}
            <button className="clear-completed" 
                hidden={todos.every(filters[todoFilterNames.ACTIVE])}
                onClick={handleClearCompletedTodo}
            >
                Clear completed
            </button>
        </footer>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todoState.todos,
    filter: state.todoState.filter,
    filters: state.todoState.filters,
});

const mapDispatchToProps = (dispatch) => ({
    filterTodo: (filter) => dispatch(todoActions.filterTodo(filter)),
    clearCompletedTodoRequest: (setOnCallingApiClearCompleted, ids) => dispatch(todoActions.clearCompletedTodoRequest(setOnCallingApiClearCompleted, ids)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
