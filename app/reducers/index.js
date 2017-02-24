import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import employees from './employees';
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({employees, form: formReducer, routing: routerReducer})

export default rootReducer