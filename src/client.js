"use strict"

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import reducers from './reducers/index';

const middleware = applyMiddleware(thunk, logger);


//WE WILL PASS INITIAL STATE FROM THE SERVER STORE
const initalState = window.INITIAL_STATE;
const store = createStore(reducers, initalState, middleware);
import routes from './routes';

const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>
)

//render method
render(
    Routes, document.getElementById('app')
);
