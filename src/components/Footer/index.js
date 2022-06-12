import { connect } from 'react-redux';
import { todoActions } from '~/actions';
import { todoFilterNames } from '~/constants';

const Footer = ({ todos, filter, filters, filterTodo, clearCompletedTodo }) => {
    
    const handleFilterTodo = (event) => {
        // dispatch to redux store
        filterTodo(event.target.dataset.filter);
    }

    const handleClearCompletedTodo = (event) => {
        // dispatch to redux store
        clearCompletedTodo();
    }
    
    return (
        <footer className="footer">
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
    clearCompletedTodo: () => dispatch(todoActions.clearCompletedTodo()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
