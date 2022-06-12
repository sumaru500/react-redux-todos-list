import { connect } from 'react-redux';
import { todoActions } from '~/actions';
const Header = ({ addTodo }) => {
    
    const handleAddTodo = (event) => {
        if(event.keyCode === 13) {
            addTodo(event.target.value);
            event.target.value = null;
        }     
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={handleAddTodo}/>
        </header>
    );
};

const dispatchToProps = (dispatch) => ({
    addTodo: (title) => {
        dispatch(todoActions.addTodo(title));
    },
});

export default connect(null, dispatchToProps)(Header);
