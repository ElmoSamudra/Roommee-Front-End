import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from "redux";
import allReducers from "./redux/combineReducers";
import {Provider} from 'react-redux'

//Creating store in which variables can be shared across pages using REDUX
//This is used to save whether user is currently on the login/register/other page to setup buttons appropriately
const store = createStore(
    allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//Provider is necessary for REDUX to work
ReactDOM.render(
    <Provider store={store}>
  <App />
    </Provider>,
  document.getElementById('root')
);

