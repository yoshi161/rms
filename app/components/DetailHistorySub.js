import React, {Component} from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import update from 'react-addons-update';


import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import LookupData from '../data/LookupData';
import { initialize, reduxForm, Field, FieldArray, SubmissionError, Form, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {textComponent, selectComponent, datePickerComponent} from './reduxForms';

class DetailHistorySub extends Component {

    constructor(props, context) {
        super(props, context);
    }

	render () {
	const ch = props.change;
if (props.fields.length > 0) {
	return (
		<div>
			{props.fields.getAll().map((data, index) => (
				  <Grid key={index}>
					<Row className="show-grid">
						<Col sm={3} md={3} className="location-time">
					<div onClick={(props) => {debugger}}> 
						<Field name={`data[${props.index}].startDate`} component={plainTextMonth} />asd</div>
						</Col>
						<Col sm={4} md={4} className="location-time">
							Job Description
							<ul>
								<li> Job Description 1</li>
								<li> Job Description 2</li>
								<li> Job Description 3</li>
							</ul>
						</Col>
						<Col sm={4} md={2} >
						</Col>
					</Row>
				  </Grid>
			))}

	   		 <button type="button" onClick={() => props.fields.push({project: "asdasdasd"})}>Add History</button>
			</div>
		)} else {
		return (
			<div>
	   		 	<button type="button" onClick={() => props.fields.push({project: "asdasdasd"})}>Add History</button>
			</div>
		)
	}}
	

}

export default DetailHistorySub;