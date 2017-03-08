import React, {Component} from 'react';
import update from 'react-addons-update';

import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { initialize, reduxForm, Field, SubmissionError, Form } from 'redux-form';

import LookupData from '../data/LookupData';
class DetailEmployee extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lookupGrade: LookupData.grade,
            lookupDivision: LookupData.division,
            employee: Object.assign({}, props.employee) 
        }

    }

    handleChangeValue(event, type) {
      /*  var nextState = update(this.props, {
             employee: {[type]: {$set: event.target.value}}
        });
        this.handleUpdateDetailEmployee(nextState.employee);*/
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

    submitz(value) {
        this.props.editEmployee(value.userName, value);
    }

    render() { 

        const textComponent = field => (
            <div>
              <TextField
                  {...field.input}
                  floatingLabelText= {field.label}
                  errorText={field.label ==""?this.props.errorTextRequired:""}
                  disabled={this.props.viewMode}
              />
            </div>
        );

        const selectComponent = field => (
            <div>
              <SelectField
                  {...field}
                  {...field.input}
                  floatingLabelText={field.label}
                  errorText={field.label ==""?this.props.errorTextRequired:""}
                  disabled={this.props.viewMode} 
                  onChange={(event, index, value) => field.input.onChange(value)}>
              </SelectField>
            </div>
        );

        const datePickerComponent = field => (
                  <DatePicker
                       {...field}
                       {...field.input}
                      floatingLabelText={field.label}
                      errorText={this.props.employee.dob==""?this.props.errorTextRequired:""}
                      onChange={(event, value) => field.input.onChange(value)}
                      onBlur={(event, value) => {}}
                      autoOk={true}
                      disabled={this.props.viewMode}
                  />
        );


        var lookupGrade = this.state.lookupGrade.map ( grade =>
            <MenuItem key={grade.code} value={grade.code} primaryText={grade.desc} />
        );
        var lookupDivision = this.state.lookupDivision.map ( div =>
            <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
        );

        const { handleSubmit } = this.props;
        return(
              <Form onSubmit={handleSubmit(this.submitz.bind(this))}>
                 <div className="content-container">
                        <h2 className="content-header">Employee</h2>
                        <div className="content">

                            <Field name="firstName" component={textComponent} label="First Name" />

                            <Field name="lastName" component={textComponent} label="Last Name" />

                            <Field name="gender" component={selectComponent} label="Gender">
                              <MenuItem value={"M"} primaryText="Male" />
                              <MenuItem value={"F"} primaryText="Female" />
                            </Field>

                            <Field name="dob" component={datePickerComponent} label="Date of Birth" />

                            <Field name="nationality" component={textComponent} label="Nationality Name" />

                            <Field name="maritalStatus" component={selectComponent} label="Marital Status">
                              <MenuItem value={"S"} primaryText="Single" />
                              <MenuItem value={"M"} primaryText="Married" />
                            </Field>

                            <Field name="phone" component={textComponent} label="Phone" />
                        </div>
                        <div className="content">

                            <Field name="subDivision" component={textComponent} label="Sub Division" />

                            <Field name="status" component={selectComponent} label="Status">
                              <MenuItem value={"C"} primaryText="Contract" />
                              <MenuItem value={"P"} primaryText="Permanent" />
                            </Field>

                            <Field name="suspendDate" component={datePickerComponent} label="Suspend Date" />

                            <Field name="hireDate" component={datePickerComponent} label="Hire Date" />

                            <Field name="grade" component={selectComponent} label="Status">
                              <MenuItem value={"C"} primaryText="Contract" />
                              <MenuItem value={"P"} primaryText="Permanent" />
                            </Field>

                            <Field name="email" component={textComponent} label="Email" />
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