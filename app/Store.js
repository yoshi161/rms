import {createStore, compose, applyMiddleware } from 'redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {hashHistory} from 'react-router'

import rootReducer from './reducers/index'

import EmployeesData from './data/EmployeesData'
import { devToolsExtension } from 'redux-devtools-extension';

const defaultState = {
	employees: EmployeesData
}

debugger 

const store = createStore(rootReducer, defaultState, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(hashHistory, store);

if (module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('/reducer/index').default;
		store.replaceReducer(nextRootReducer);
	});
};

export default store;