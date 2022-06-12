import { useState, useEffect} from 'react';
const TodoItem = ({ index, todo: { title, completed }, todoActions }) => {
    // local state for editing item
    const [editValue, setEditValue] = useState(title);
    const [isEditing, setEditing] = useState(false);
    // local state for checkbox 
    const [completedValue, setCompletedValue] = useState(completed);
    useEffect(() => {
        setCompletedValue(completed);
    }, [completed])


    // --- Handle REMOVE Item
    const handleRemoveTodo = (event) => {
        // dispatch to Redux store
        todoActions.removeTodo(index);
    };

    // --- Handle Edit Item
    const handleEditBeginTodo = (event) => {
        // change in hook state
        setEditing(true);
    };

    const handleEditEndTodo = (event) => {
        if (event.keyCode === 13) {
            // dispatch to Redux store
            todoActions.editEndTodo(index, editValue);
            // change in hook state
            setEditing(false);
        }
        else if (event.keyCode === 27) {
            // change in hook state
            setEditing(false);
            setEditValue(title);
        }
    }

    const handleEditCancelTodo = (event) => {
        // change in hook state
        setEditing(false);
        setEditValue(title);
    }

    // --- Handle Toggle Item
    const handleToggleTodo = (event) => {
        // dispatch to redux store
        todoActions.toggleTodo(index);
    }

    return (
        <li className={`${completedValue ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            <div className="view">
                <input className="toggle" type="checkbox" 
                    checked={completedValue} 
                    onChange={(event) => {setCompletedValue(event.target.checked)}} 
                    onClick={handleToggleTodo}
                />
                <label onDoubleClick={handleEditBeginTodo}>{title}</label>
                <button className="destroy" onClick={handleRemoveTodo}></button>
            </div>
            <input 
                className="edit" 
                value={editValue}
                onKeyUp={handleEditEndTodo}
                onChange={(event) => {setEditValue(event.target.value)}}
                onBlur={handleEditCancelTodo} />
        </li>
    );
};

export default TodoItem;
