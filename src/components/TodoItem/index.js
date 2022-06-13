import { useState, useEffect} from 'react';
const TodoItem = ({ index, todo: { id, title, completed }, todoActions }) => {
    const [isOnCallingApiRemove, setOnCallingApiRemove] = useState(false);
    const [isOnCallingApiEdit, setOnCallingApiEdit] = useState(false);
    const [isOnCallingApiToggle, setOnCallingApiToggle] = useState(false);
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
        todoActions.removeTodoRequest(setOnCallingApiRemove, id);
    };

    // --- Handle Edit Item
    const handleEditBeginTodo = (event) => {
        // change in hook state
        setEditing(true);
    };

    const handleEditEndTodo = (event) => {
        if (event.keyCode === 13) {
            // dispatch to Redux store
            todoActions.editEndTodoRequest(setOnCallingApiEdit, id, editValue);
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
        todoActions.toggleTodoRequest(setOnCallingApiToggle, id, event.target.checked);
    }

    return (   
        <li className={`${completedValue ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            {isOnCallingApiRemove && <div>Deleting...</div>}
            {isOnCallingApiToggle && <div>Toggleing...</div>}
            <div className="view">
                <input className="toggle" type="checkbox" 
                    checked={completedValue} 
                    onChange={(event) => {setCompletedValue(event.target.checked)}} 
                    onClick={handleToggleTodo}
                    />
                <label onDoubleClick={handleEditBeginTodo}>{title}</label>
                <button className="destroy" onClick={handleRemoveTodo}></button>
            </div>
            {isOnCallingApiEdit && <div>Saving...</div>}
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
