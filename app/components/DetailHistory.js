import React, {Component} from 'react';
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';
import update from 'react-addons-update';
import _  from 'lodash';


import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import LookupData from '../data/LookupData';
import { initialize, reduxForm, Field, FieldArray, SubmissionError, Form, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {textComponent, selectComponent, datePickerComponent} from './reduxForms';



const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class DetailHistory extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        	historyTemp: {
        		from: new Date(),
        		to: new Date(),
        		client: "new client",
        		role: "new role",
        		jobDescs: ["new jobdesc"]
        	}
        }

        this.add = this.add.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this);
    }

    handleChangeValue(object, value, type, idx) {
    	
        var historiesTemp = _.cloneDeep(this.props.employeeTemp.histories);
        historiesTemp[idx][type] = value; 
        var propsTemp = update(this.props.employeeTemp, {
             histories: {$set: historiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    handleJobdescChangeValue(object, value, type, idx, index) {
        var historiesTemp = _.cloneDeep(this.props.employeeTemp.histories);
        historiesTemp[idx][type][index] = value; 
        var propsTemp = update(this.props.employeeTemp, {
             histories: {$set: historiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    add() {

        const current = update(this.props, {
            employeeTemp: {
                histories: {$push: [_.cloneDeep(this.state.historyTemp)]}
            }
        });

        this.props.setCurrentEmployeeTemp(current.employeeTemp);
    }

    addJob(idx) {
        var historiesTemp = _.cloneDeep(this.props.employeeTemp.histories);
        if (!historiesTemp[idx].jobDescs) {
        	historiesTemp[idx].jobDescs = [];
        }
        historiesTemp[idx].jobDescs.push("new description"); 
        var propsTemp = update(this.props.employeeTemp, {
             histories: {$set: historiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    removeJob(idx, index) {
        var historiesTemp = _.cloneDeep(this.props.employeeTemp.histories);
        historiesTemp[idx].jobDescs.splice(index, 1); 
        var propsTemp = update(this.props.employeeTemp, {
             histories: {$set: historiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    deleteHistory(index) {
        var historiesTemp = _.cloneDeep(this.props.employeeTemp.histories);
        historiesTemp.splice(index, 1); 
        var propsTemp = update(this.props.employeeTemp, {
             histories: {$set: historiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }
  

    render() {
        var modalStyle = {
            width: 800
        };

        var historyDetailNoEdit = (history) => {

	        const monthFrom = monthNames[new Date(history.from).getMonth()];
	        const yearFrom = new Date(history.from).getFullYear();
	        const monthTo = monthNames[new Date(history.to).getMonth()];
	        const yearTo = new Date(history.to).getFullYear();

	        return (
	        	<Col sm={3} md={3} className="location-time">
                    <div className="location-month"> {monthFrom} - {monthTo} </div>
                    <div className="location-year"> {yearFrom} - {yearTo} </div>
                    <div className="location-month"> {history.client} </div>
                    <div className="location-month"> {history.role} </div>
				</Col>
	        )

        }

        var historyDetailWithEdit = (history, idx) => {
        		var from = new Date(history.from);
        		var to = new Date(history.to);

        	return (

    		<Col sm={3} md={3} className="location-time">
                <DatePicker
                    value={from}
                    floatingLabelText="From"
                    errorText={history.from==""?this.props.errorTextRequired:""}
                    onChange={(object, value) => this.handleChangeValue(object, value, 'from', idx)}
                    autoOk={true}
                />
                <DatePicker
                    value={to}
                    floatingLabelText="To"
                    errorText={history.to==""?this.props.errorTextRequired:""}
                    onChange={(object, value) => this.handleChangeValue(object, value, 'to', idx)}
                    autoOk={true}
                />
                <TextField
                	id={'client' + idx}
                    value={history.client}
                    onChange={(object, value) => this.handleChangeValue(object, value, 'client', idx)}
                />
                <TextField
                	id={'role' + idx}
                    value={history.role}
                    onChange={(object, value) => this.handleChangeValue(object, value, 'role', idx)}
                />
			</Col>
        	);
        }

        var historyJobDescNoEdit = (history) => (
			<Col sm={4} md={4} className="location-time">
				<div>Job Description</div>
				{ history.jobDescs && history.jobDescs.map((jobDesc, index) => 
						(

        					<div className="location-month" key={index}> {jobDesc} </div>
						)
					) 
				}
			</Col>

        );

        var historyJobDescWithEdit = (history, idx) => (
			<Col sm={4} md={4} className="location-time">
				<div>
					<span>Job Description </span>

                    <Glyphicon glyph="plus" className="location-action" 
                         onClick={() => this.addJob(idx)}  />
				</div>
				{ history.jobDescs && history.jobDescs.map((jobDesc, index) => 
						(
							<div key={index} >
			                    <TextField
			                    	id={'jobdesc' + index}
			                        value={jobDesc}
			                        onChange={(object, value) => this.handleJobdescChangeValue(object, value, 'jobDescs', idx, index)}
			                    />

		                    <Glyphicon glyph="trash" className="location-action" 
		                         onClick={() => this.removeJob(idx, index)}/>
		                    </div>
						)
					) 
				}
			</Col>

        );

		const actionDeleteButton = (index) => (
                <div>
                    <Glyphicon glyph="trash" className="location-action" 
                        onClick={() => this.deleteHistory(index)} />
                </div>
            );

        var empTemp = this.props.employeeTemp;
		var maps =  empTemp.histories ? empTemp.histories.map((history, idx) =>
            (
				  <Grid key={idx} >
					<Row className="show-grid">
                  	    { this.props.viewMode ? historyDetailNoEdit(history) : 
                  	    		historyDetailWithEdit(history, idx) }
						{ this.props.viewMode ? historyJobDescNoEdit(history) : 
							historyJobDescWithEdit(history, idx)}
						{ this.props.viewMode ? null : actionDeleteButton(idx)}
					</Row>
				  </Grid>
            ) 
		): null;


        const addButton = (
                <div className="location-float-button">
                    <FloatingActionButton secondary={true} onClick={this.add}>
                      <ContentAdd />
                    </FloatingActionButton>
                </div>
                );

        const { change } = this.props;

    	const style = {width: '100%', color: 'black', height: '1px', backgroundColor: 'purple'};

        return(
            <div className="content-container">
                <h2 className="content-header">History</h2>	
                <div className="content" style={modalStyle}>
                    {maps}
                </div>
                { !this.props.viewMode ? addButton : null  }
            </div>
        );
    }
}

export default DetailHistory;