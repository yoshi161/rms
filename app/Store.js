import {createStore, compose} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {hashHistory} from 'react-router'

import rootReducer from './reducers/index'

import EmployeesData from './data/EmployeesData'

const defaultState = {
	employees: EmployeesData
}

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store);

if (module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('/reducer/index').default;
		store.replaceReducer(nextRootReducer);
	});
};

export default store;