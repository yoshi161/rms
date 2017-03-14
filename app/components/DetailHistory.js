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

const dataRender = (props) => {(
		<div>
			{props.fields && props.fields.length > 0 ? props.fields.getAll().map((data, index) => (
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
			)) : <div></div>}

   		 <button type="button" onClick={() => props.fields.push({project: "asdasdasd"})}>Add Member</button>
		</div>
	)}



const Dates = function (props) {
	const dateButtonStyle = {float: 'right', marginRight: '10px'};

	const state = props.theState
	const changeDate = props.changeDate
	const prop = props;
	if (state) {	
		return (
				<div>
					<Field name={`data[${props.index}].startDate`} component={datePickerComponent} label="Start Date"/>
					<Field name={`data[${props.index}].endDate`} component={datePickerComponent} label="End Date"/>
					<div>
     				   <Glyphicon glyph="floppy-disk" style={dateButtonStyle} onClick={() => props.change(`data[${props.index}].state`, false)}/>
     				   <Glyphicon glyph="remove" style={dateButtonStyle} />
					</div>
				</div>
			);

	} else {
		return  (
				<div>
					<div onClick={() => props.change(`data[${props.index}].state`, true)}> 
						<Field name={`data[${props.index}].startDate`} component={plainTextMonth} /> - <Field name={`data[${props.index}].endDate`} component={plainTextMonth} /> </div>
					<div onClick={() =>  props.change(`data[${props.index}].state`, true)}> 
						<Field name={`data[${props.index}].startDate`} component={plainTextYear} /> - <Field name={`data[${props.index}].endDate`} component={plainTextYear} /> </div>
				</div>
		);
	}
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const plainTextYear = field => ( <span  className="location-month" > {field.input.value ? field.input.value.getFullYear() : "Year"} </span> )

const plainTextMonth = field => ( <span className="location-year" > {field.input.value ?  monthNames[field.input.value.getMonth()] : "Month"}  </span> )

DetailHistory = reduxForm({
  form: 'detailHistory',  // a unique identifier for this form
})(DetailHistory)

// You have to connect() to any reducers that you wish to connect to yourself
const DetailHistoryContainer = connect(
  (state, props) => ({

    	formValues: formValueSelector('detailHistory')
  })              
)(DetailHistory)

export default DetailHistoryContainer;