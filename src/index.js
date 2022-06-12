import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

import rootReducer from '~/reducers';
import GlobalStyles from './components/GlobalStyles';
import App from '~/containers/App';
import reduxLogger from './libs/reduxLogger';

import '~/libs/utils';

const store = createStore(reduxLogger(rootReducer));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <Provider store={store}>
                <App />
            </Provider>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
