import React, {Component} from 'react';
import update from 'react-addons-update';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import LookupData from '../data/LookupData';

class DetailEmployee extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lookupGrade: LookupData.grade,
            lookupDivision: LookupData.division,
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
                    <input type="hidden" id="employeeId" value={this.props.employee.id}/>
                    <TextField
                        value={this.props.employee.firstName}
                        floatingLabelText="First Name"
                        errorText={this.props.employee.firstName==""?this.props.errorTextRequired:""}
                        onChange={event => this.handleChangeValue(event, 'firstName')}
                        disabled={this.props.viewMode}
                    /><br />
                    <TextField
                        value={this.props.employee.lastName}
                        floatingLabelText="Last Name"
                        errorText={this.props.employee.lastName==""?this.props.errorTextRequired:""}
                        onChange={event => this.handleChangeValue(event, 'lastName')}
                        disabled={this.props.viewMode}
                    /><br />
                    <SelectField
                        value={this.props.employee.gender}
                        floatingLabelText="Gender"
                        errorText={this.props.employee.gender==""?this.props.errorTextRequired:""}
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'gender')}
                        disabled={this.props.viewMode} >
                        <MenuItem value={"M"} primaryText="Male" />
                        <MenuItem value={"F"} primaryText="Female" />
                    </SelectField><br />
                    <DatePicker
                        value={this.props.employee.dob}
                        floatingLabelText="Date of Birth"
                        errorText={this.props.employee.dob==""?this.props.errorTextRequired:""}
                        onChange={(event, date) =>  this.handleChangeDateValue(event, date, 'dob')}
                        autoOk={true}
                        disabled={this.props.viewMode}
                    />
                    <TextField
                        value={this.props.employee.nationality}
                        floatingLabelText="Nationality"
                        onChange={event => this.handleChangeValue(event, 'nationality')}
                        disabled={this.props.viewMode}
                    /><br />
                    <SelectField
                        value={this.props.employee.maritalStatus}
                        floatingLabelText="Marital Status"
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'maritalStatus')}
                        disabled={this.props.viewMode}>
                        <MenuItem value={"S"} primaryText="Single" />
                        <MenuItem value={"M"} primaryText="Married" />
                    </SelectField><br />
                    <TextField
                        value={this.props.employee.phone}
                        floatingLabelText="Phone"
                        errorText={this.props.employee.phone==""?this.props.errorTextRequired:""}
                        onChange={event => this.handleChangeValue(event, 'phone')}
                        disabled={this.props.viewMode}
                    /><br />
                </div>
                <div className="content">
                    <TextField
                        value={this.props.employee.subDivision}
                        floatingLabelText="Sub Division"
                        errorText={this.props.employee.subDivision==""?this.props.errorTextRequired:""}
                        onChange={event => this.handleChangeValue(event, 'subDivision')}
                        disabled={this.props.viewMode}
                    /><br />
                    <SelectField
                        value={this.props.employee.status}
                        floatingLabelText="Status"
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'status')}
                        disabled={this.props.viewMode} >
                        <MenuItem value={"C"} primaryText="Contract" />
                        <MenuItem value={"P"} primaryText="Permanent" />
                    </SelectField><br />
                    <DatePicker
                        value={this.props.employee.suspendDate}
                        floatingLabelText="Suspend Date"
                        onChange={(event, date) =>  this.handleChangeDateValue(event, date, 'suspendDate')}
                        autoOk={true}
                        disabled={this.props.viewMode}
                    />
                    <DatePicker
                        value={this.props.employee.hireDate}
                        floatingLabelText="Hire Date"
                        onChange={(event, date) =>  this.handleChangeDateValue(event, date, 'hireDate')}
                        autoOk={true}
                        disabled={this.props.viewMode}
                    />
                    <SelectField
                        value={this.props.employee.grade}
                        floatingLabelText="Grade"
                        errorText={this.props.employee.grade==""?this.props.errorTextRequired:""}
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'grade')}
                        disabled={this.props.viewMode} >
                        {lookupGrade}
                    </SelectField><br />
                    <SelectField
                        value={this.props.employee.division}
                        floatingLabelText="Division"
                        errorText={this.props.employee.division==""?this.props.errorTextRequired:""}
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'division')}
                        disabled={this.props.viewMode} >
                        {lookupDivision}
                    </SelectField><br />
                    <TextField
                        value={this.props.employee.email}
                        floatingLabelText="Email"
                        errorText={this.props.employee.email==""?this.props.errorTextRequired:""}
                        onChange={event => this.handleChangeValue(event, 'email')}
                        disabled={this.props.viewMode}
                    /><br />
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

export default DetailEmployee;