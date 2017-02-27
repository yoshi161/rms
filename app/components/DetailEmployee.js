import React, {Component} from 'react';
import update from 'react-addons-update';

import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { reduxForm, Field, SubmissionError } from 'redux-form';

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
        var nextState = update(this.props, {
             employee: {[type]: {$set: event.target.value}}
        });
        this.handleUpdateDetailEmployee(nextState.employee);
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

    componentDidMount() {
    //  this.handleInitialize();
    }
    

    render() { 

        const renderField = field => (
            <div>
              <input {...field.input}/>
            </div>
        );

        const renderz = field => (
                <TextField
                    {...field}
                    floatingLabelText="First Name"
                    errorText={field.firstName ==""?this.props.errorTextRequired:""}
                    onChange={event => this.handleChangeValue(event, 'firstName')}
                    disabled={this.props.viewMode}
                />
        );

        var lookupGrade = this.state.lookupGrade.map ( grade =>
            <MenuItem key={grade.code} value={grade.code} primaryText={grade.desc} />
        );
        var lookupDivision = this.state.lookupDivision.map ( div =>
            <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
        );

        var handleSubmit = () => {}
        return(
              <form onSubmit={handleSubmit}>
                 <div className="content-container">
                        <h2 className="content-header">Employee</h2>
                        <div className="content">

                            <Field name="firstName" component={renderz} />
                            <Avatar
                              src={require("../images/kholishul_a.jpg")}
                              size={100}
                            />
                        </div>
                 </div>
              </form>
        );
    }
}


DetailEmployee = reduxForm({
  form: 'initializeFromState'  // a unique identifier for this form
})(DetailEmployee)

debugger
// You have to connect() to any reducers that you wish to connect to yourself
const DetailEmployeeContainer = connect(
  (state, props) => ({
    initialValues: props.employee
  })              
)(DetailEmployee)


export default DetailEmployeeContainer