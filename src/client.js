"use strict"

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';


import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {logger} from 'redux-logger';

import reducers from './reducers/index';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import BooksList from "./components/pages/booksList";
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';


const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList}/>
                <Route path="/admin" component={BooksForm}/>
                <Route path="/cart" component={Cart}/>
            </Route>
        </Router>
    </Provider>
)

//render method
render(
    Routes, document.getElementById('app')
);
