import React, {Component} from 'react';

import {Link} from 'react-router';


class NotFound extends Component {

render () {

	return (
		<div className="container">
			  <div className="row">
			    <div className="col-m-12"></div>
			  </div>
			<div className="jumbotron">
			  <h1 className="display-3">Error 404</h1>
			  <p className="lead">Data Not Found</p>
			  <p className="lead">
			    <Link className="btn btn-primary btn-lg" to={'details'} role="button">Go to Employees</Link>
			  </p>
			</div>
		</div>
	);
}

}

export default NotFound;