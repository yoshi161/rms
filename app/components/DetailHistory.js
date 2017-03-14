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


const textC = field => (
    <div>
      {field.label}
    </div>
);

class DetailHistory extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        	dateState: false,
        	projectState: false,
        	programState: false,
        }
    }

    changeDateState() {
    	const newState = !this.state.dateState
    	this.setState({dateState: newState})
    	console.log("change date");
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

        const { change } = this.props;

    	const style = {width: '100%', color: 'black', height: '1px', backgroundColor: 'purple'};



        return(
            <div className="content-container">
                <h2 className="content-header">History</h2>
				<FieldArray name="data" component= { dataRender } changeDate={this.changeDateState.bind(this)} 
					change={change}/>
            </div>
        );
    }
}

const dataRender = (props) => (
		<div>
			{props.fields.getAll().map((data, index) => (
				  <Grid key={index}>
					<Row className="show-grid">
						<Col sm={3} md={3} className="location-time">
							<Dates changeDate={props.changeDate} 
								change={props.change} theState={data.state} index={index}/>
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

   		 <button type="button" onClick={() => change('data[0].state', true)}>Add Member</button>
		</div>
	)



const Dates = function (props) {
	const dateButtonStyle = {float: 'right', marginRight: '10px'};

	const state = props.theState
	const changeDate = props.changeDate
	const prop = props;
	debugger
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
					<div className="location-month" onClick={() => props.change(`data[${props.index}].state`, true)}> November - February </div>
					<div className="location-year" onClick={() => {debugger}}> 2016-PRESENT </div>
				</div>
		);
	}
}

const TheInput = function (props) {

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

const renderData = ({fields}) => (
		<div>
			{fields.getAll().map((data, index) => (
					<div key={index}>
				        <Field name={`data[${index}].project`} component={textComponent}  label="Project"/>
					</div>
					)
				)}

   		 <button type="button" onClick={() => fields.push({project: "asdasdasd"})}>Add Member</button>
		</div>
	)

DetailHistory = reduxForm({
  form: 'detailHistory',  // a unique identifier for this form
})(DetailHistory)

// You have to connect() to any reducers that you wish to connect to yourself
const DetailHistoryContainer = connect(
  (state, props) => ({

    	formValues: formValueSelector('detailHistory'),
	    initialValues: {
	    	data : [{
	    		project: 'Project Name 1',
	    		program: 'Program 1',
	    		startDate:Date.now(),
	    		endDate: Date.now(),
	    		details: [
	    			"details 1",
	    			"details 2",
	    			"details 3",
	    			"details 4"
	    		],
	    		state: false

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
	    		],
	    		state: false

	    	}], 
		    	asd: "asd",
	    		startDate:Date.now(),
	    		endDate: Date.now()
    		}
  })              
)(DetailHistory)

export default DetailHistoryContainer;