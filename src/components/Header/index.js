import { useState } from 'react';
import { connect } from 'react-redux';
import { todoActions } from '~/actions';
const Header = ({ addTodoRequest }) => {
    const [isOnCallingApi, setOnCallingApi] = useState(false);
    const handleAddTodo = (event) => {
        if(event.keyCode === 13 && event.target.value) {
            addTodoRequest(setOnCallingApi, event.target.value);
            event.target.value = null;
        }     
    }

    return (
        <header className="header">
            <h1>todos</h1>
            {isOnCallingApi && <div>Calling...</div>}
            <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={handleAddTodo}/>
        </header>
    );
};

const dispatchToProps = (dispatch) => ({
    addTodoRequest: (setOnCallingApi, title) => {
        dispatch(todoActions.addTodoRequest(setOnCallingApi, title));
    },
});

export default connect(null, dispatchToProps)(Header);
