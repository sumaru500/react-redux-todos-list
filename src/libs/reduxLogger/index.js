export default function reduxLogger(loggedReducer) {
    return (prevState, action) => {
        // log previous state and action args
        console.group(action.type);
        console.log('prevState : ', prevState);
        console.log('payload: ', action.payload);
        const nextState = loggedReducer(prevState, action);
        // log current state and action args
        console.log('nextState : ', nextState);
        console.groupEnd(action.type);
        return nextState;
    }
}