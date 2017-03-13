import React, {Component} from 'react';
import update from 'react-addons-update';

import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import { initialize, reduxForm, Field, SubmissionError, Form } from 'redux-form';

import LookupData from '../data/LookupData';

import {textComponent, selectComponent, datePickerComponent} from './reduxForms';





class DetailEmployee extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lookupGrade: LookupData.grade,
            lookupDivision: LookupData.division,
            employee: Object.assign({}, props.employee) 
        }

    }

    handleChangeSelectValue(event, index, value, type) {
        var nextState = update(this.props, {
             employee: {[type]: {$set: value}}
        });
        this.handleUpdateDetailEmployee(nextState.employee);
    }

    handleChangeDateValue(event, date, type) {
        var nextState = update(this.props, {
             employee: {[type]: {$set: date}}
        });
        this.handleUpdateDetailEmployee(nextState.employee);
    }

    handleUpdateDetailEmployee(employee){
        this.props.setCurrentEmployee(employee);
    }
	
  	shouldComponentUpdate(nextProps) {
      if (this.props.employee !== nextProps.employee) {
        this.props.dispatch(initialize('initializeFromState', nextProps.employee));
      }
      return true;
  	}

    submits(value) {
        this.props.editEmployee(value.userName, value);
    }

    render() { 


        var lookupGrade = this.state.lookupGrade.map ( grade =>
            <MenuItem key={grade.code} value={grade.code} primaryText={grade.desc} />
        );
        var lookupDivision = this.state.lookupDivision.map ( div =>
            <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
        );

        const { handleSubmit } = this.props;
        return(
              <Form onSubmit={handleSubmit(this.submits.bind(this))}>
                 <div className="content-container">
                        <h2 className="content-header">Employee</h2>
                        <div className="content">
                            <Field name="firstName" component={textComponent} label="First Name" 
                              disabled={this.props.viewMode} />

                            <Field name="lastName" component={textComponent} label="Last Name"  
                              disabled={this.props.viewMode} />

                            <Field name="gender" component={selectComponent} label="Gender" 
                              disabled={this.props.viewMode} >
                              <MenuItem value={"M"} primaryText="Male" />
                              <MenuItem value={"F"} primaryText="Female" />
                            </Field>

                            <Field name="dob" component={datePickerComponent} label="Date of Birth"  
                              disabled={this.props.viewMode} />

                            <Field name="nationality" component={textComponent} label="Nationality Name"  
                              disabled={this.props.viewMode} />

                            <Field name="maritalStatus" component={selectComponent} label="Marital Status" 
                              disabled={this.props.viewMode} >
                              <MenuItem value={"S"} primaryText="Single" />
                              <MenuItem value={"M"} primaryText="Married" />
                            </Field>

                            <Field name="phone" component={textComponent} label="Phone"  
                              disabled={this.props.viewMode} />
                        </div>
                        <div className="content">

                            <Field name="subDivision" component={textComponent} label="Sub Division"  
                              disabled={this.props.viewMode} />

                            <Field name="status" component={selectComponent} label="Status" 
                              disabled={this.props.viewMode} >
                              <MenuItem value={"C"} primaryText="Contract" />
                              <MenuItem value={"P"} primaryText="Permanent" />
                            </Field>

                            <Field name="suspendDate" component={datePickerComponent} label="Suspend Date"  
                              disabled={this.props.viewMode} />

                            <Field name="hireDate" component={datePickerComponent} label="Hire Date"  
                              disabled={this.props.viewMode} />

                            <Field name="grade" component={selectComponent} label="Status" 
                              disabled={this.props.viewMode} >
                              <MenuItem value={"C"} primaryText="Contract" />
                              <MenuItem value={"P"} primaryText="Permanent" />
                            </Field>

                            <Field name="email" component={textComponent} label="Email"  
                              disabled={this.props.viewMode} />
                        </div>
                        <div className="content">
                            <Avatar
                              src={require("../images/kholishul_a.jpg")}
                              size={100}
                            />
                        </div>
                 </div>
              </Form>
        );
    }
}

DetailEmployee = reduxForm({
  form: 'initializeFromState',  // a unique identifier for this form
})(DetailEmployee)

// You have to connect() to any reducers that you wish to connect to yourself
const DetailEmployeeContainer = connect(
  (state, props) => (
  {
    initialValues: props.employee
  })              
)(DetailEmployee)


export default DetailEmployeeContainer