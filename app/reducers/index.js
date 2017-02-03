import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import employees from './employees';

const rootReducer = combineReducers({employees, routing: routerReducer})

export default rootReducer