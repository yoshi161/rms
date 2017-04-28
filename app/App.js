import React, {Component} from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dashboard from './components/Dashboard';
import EmployeeTab from './components/EmployeeTab';
import DetailFamily from './components/DetailFamily';
import DetailHistory from './components/DetailHistory';
import DetailEmployee from './components/DetailEmployee';
import DetailLocation from './components/DetailLocation';
import NotFound from './components/NotFound';

import Login from './components/Login';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router'
import {bindActionCreators} from 'redux';

import store, {history} from './store';

import * as actionCreators from './action/actionCreators';
import { connect, Provider } from 'react-redux';


// Needed for onTouchTap
injectTapEventPlugin();


function mapStateToProps(state) {
	return {
		employees: state.employees
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const routing = (
	<Provider store={store} >
		<Router history={history}>
			<Route component={App} >
				<Route  path="details" component={EmployeeTab}>
					 <IndexRoute component={DetailEmployee} />
			   </Route>
				<Route  path="details/:userName"  component={EmployeeTab}>
					 <IndexRoute component={DetailEmployee} />
					 <Route path="locations" component={DetailLocation} />
					 <Route path="histories" component={DetailHistory} />
					 <Route path="families" component={DetailFamily} />
			   </Route>
			</Route>
			<Route path='/404' component={NotFound} />
			<Redirect from='*' to='/404' />
		</Router>
	</Provider>

);

// Render the main app react component into the app div.
render(routing, document.getElementById('root'));


