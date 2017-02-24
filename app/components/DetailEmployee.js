import React, {Component} from 'react';
import update from 'react-addons-update';

import { connect } from 'react-redux'

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

    const { DOM: { input, select, textarea } } = React

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
    

    render() { 
        var lookupGrade = this.state.lookupGrade.map ( grade =>
            <MenuItem key={grade.code} value={grade.code} primaryText={grade.desc} />
        );
        var lookupDivision = this.state.lookupDivision.map ( div =>
            <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
        );


        return(
            <div className="content-container">
                <h2 className="content-header">Employee</h2>
                <div className="content" >
                      <Field name="firstname" component={input} type="text" placeholder="First Name"/>
                </div>
                <div className="content">
                    <Avatar
                      src={require("../images/kholishul_a.jpg")}
                      size={100}
                    />
                </div>
              </div>
        );
    }
}

DetailEmployee = reduxForm({
  form: 'initializeFromState'  // a unique identifier for this form
})(DetailEmployee)

// You have to connect() to any reducers that you wish to connect to yourself
DetailEmployee = connect(
  state => ({
    initialValues: {
        firstname: 'asd'
    }
  })              
)(DetailEmployee)


export default DetailEmployee