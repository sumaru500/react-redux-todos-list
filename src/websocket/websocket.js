import { io } from 'socket.io-client';
import { todoActions } from '~/actions';
const PORT_WS = 4001;
const initWebSocket = (store) => {
    const clientSocket = io(`http://localhost:${PORT_WS}`);

    clientSocket.on('connection', (socket) => {
        console.log('Socket client connected');
    });

    clientSocket.on('error', (error) => {
        console.log('Socket client error', error);
    });

    clientSocket.on('todos', (data) => {
        console.log('Received data:', data);
        store.dispatch(todoActions.onNotificationSocket(data));
    });
};

export default initWebSocket;
