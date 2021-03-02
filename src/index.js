import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import authReducer from './store/reducers/authReducer';
import userReducer from './store/reducers/userReducer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './mockServer';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  authReducer: authReducer,
  userReducer:userReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
