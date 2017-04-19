import {createStore, compose, applyMiddleware } from 'redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {hashHistory} from 'react-router'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import EmployeesData from './data/EmployeesData'
import { devToolsExtension } from 'redux-devtools-extension';

const defaultState = {
	employees: EmployeesData,
	employee: {}
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, defaultState, enhancer);


//const store = createStore(rootReducer, defaultState, applyMiddleware(thunk), 
//	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(hashHistory, store);

if (module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('/reducer/index').default;
		store.replaceReducer(nextRootReducer);
	});
};

export default store;