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

class DetailHistory extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        	dateState: false,
        	projectState: false,
        	programState: false,
        }
    }

    changeDate() {
    	alert("change date");
    }

    changeDateState() {
    	const newState = !this.state.dateState
    	this.setState({dateState: newState})
    }

    changeProjectState() {
    	const newState = !this.state.projectState
    	this.setState({projectState: newState})
    }

    changeProgramState() {
    	const newState = !this.state.programState
    	this.setState({programState: newState})
    }

  

    render() {


    	function Dates(props) {

    		const dateButtonStyle = {float: 'right', marginRight: '10px'};

    		const state = props.theState
    		const changeDate = props.changeDate
    		if (state) {	
    			return (
	    				<div>
							<Field name="startDate" component={datePickerComponent} label="Start Date"/>
							<Field name="endDate" component={datePickerComponent} label="End Date"/>
							<div>
             				   <Glyphicon glyph="floppy-disk" style={dateButtonStyle} />
             				   <Glyphicon glyph="remove" style={dateButtonStyle} />
							</div>
	    				</div>
    				);

    		} else {
    			return  (
	    				<div>
							<div className="location-month" onClick={changeDate}> November - February </div>
							<div className="location-year" onClick={changeDate}> 2016-PRESENT </div>
	    				</div>
    			);
    		}
    	}

    	function TheInput(props) {

    		const projectStyle = {height: '85px'};
    		const dateButtonStyle = {float: 'right', marginRight: '10px'};
    		const state = props.theState, change = props.change
    		if (state) {
    			return   (
    				<div style={projectStyle}>
						<Field name={props.name} component={textComponent} label={props.label} style={dateButtonStyle} />
     				    <Glyphicon glyph="floppy-disk" style={dateButtonStyle} />
     				    <Glyphicon glyph="remove" style={dateButtonStyle} />
    				</div>
    				);
    		} else {
    			return (
					<div>a
					</div>
    				)
    		}
    	}

    	const style = {width: '100%', color: 'black', height: '1px', backgroundColor: 'purple'};

        return(
            <div className="content-container">
                <h2 className="content-header">History</h2>
				  <Grid>
					<Row className="show-grid">
						<Col sm={3} md={3} className="location-time">
							<Dates changeDate={this.changeDateState.bind(this)} theState={this.state.dateState}/>
     						<hr style={style} />
							<TheInput  name='project' label='Project'
								change={this.changeProjectState.bind(this)} 
								theState={this.state.projectState}/> 
							<TheInput name='program' label='Program'
							 change={this.changeProgramState.bind(this)} theState={this.state.programState}/> 
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
				  <Grid>
					<Row className="show-grid">
						<Col sm={3} md={3} className="location-time">
							<FieldArray name="members" component= { fields => 
								{ debugger }
    						} />
                            <Field name="asd" component={textComponent} label="First Name"  />
						</Col>
					</Row>
				  </Grid>
            </div>
        );
    }
}

DetailHistory = reduxForm({
  form: 'detailHistory',  // a unique identifier for this form
})(DetailHistory)

// You have to connect() to any reducers that you wish to connect to yourself
const DetailHistoryContainer = connect(
  (state, props) => ({
	    initialValues: {
	    	members : [{
	    		project: 'Project Name 1',
	    		program: 'Program 1',
	    		startDate:Date.now(),
	    		endDate: Date.now(),
	    		details: [
	    			"details 1",
	    			"details 2",
	    			"details 3",
	    			"details 4"
	    		]

	    	},{
	    		project: 'Project Name 2',
	    		program: 'Program 2',
	    		startDate:Date.now(),
	    		endDate: Date.now(),
	    		details: [
	    			"details 1",
	    			"details 2",
	    			"details 3",
	    			"details 4"
	    		]

	    	}], asd: "asd"}
  })              
)(DetailHistory)

export default DetailHistoryContainer;