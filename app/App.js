import React, {Component} from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dashboard from './components/Dashboard';
import EmployeeTab from './components/EmployeeTab';
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

class CobaApp extends Component {
	render() {
		console.log(this);
		return (<div>Coba1 {this.props.children}</div>)
	}
}

class Coba1 extends Component {
	render() {
		const a = JSON.stringify(this.props.employees);
		console.log(this);
		return (<div>Coba11 {a} {this.props.children}</div>)
	}
}

class Coba2 extends Component {                         
	render() {
		return (<div>Coba2 {this.props.children}</div>)
	}
}

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
				<Route  path="details"  component={EmployeeTab}>
					 <IndexRoute component={DetailEmployee} />
					 <Route path="location" component={DetailLocation} />
			   </Route>
				<Route  path="details/:userName"  component={EmployeeTab}>
					 <IndexRoute component={DetailEmployee} />
					 <Route path="location" component={DetailLocation} />
			   </Route>
			</Route>
			<Route path='/404' component={NotFound} />
			<Redirect from='*' to='/404' />
		</Router>
	</Provider>

);

// Render the main app react component into the app div.
render(routing, document.getElementById('root'));


