import React, {Component} from 'react';
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';
import update from 'react-addons-update';
import _  from 'lodash';


import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
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

class DetailFamily extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            familyTemp: {
                name: "",
                gender: "M",
                dob: new Date(),
                type: "W",
                active: true
            },
            lookupFamily: LookupData.family,
            lookupGender: LookupData.gender
        }

        this.add = this.add.bind(this);
    }

    handleChangeValue(object, value, type, idx) {
        debugger
        var familiesTemp = _.cloneDeep(this.props.employeeTemp.families);
        familiesTemp[idx][type] = value; 
        var propsTemp = update(this.props.employeeTemp, {
             families: {$set: familiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    add() {

        const current = update(this.props, {
            employeeTemp: {
                families: {$push: [_.cloneDeep(this.state.familyTemp)]}
            }
        });

        this.props.setCurrentEmployeeTemp(current.employeeTemp);
    }

    delete(index) {
        var familiesTemp = _.cloneDeep(this.props.employeeTemp.families);
        familiesTemp.splice(index, 1); 
        var propsTemp = update(this.props.employeeTemp, {
             families: {$set: familiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

  
  

    render() {
            const detailNoEdit = (family) => {

                const dob = monthNames[new Date(family.dob).getMonth()];

                return (
                    <Col sm={10} md={7}>
                        <div>{family.name}</div>
                        <div>{family.gender}</div>
                        <div>{family.dob}</div>
                        <div>{family.type}</div>
                        <div>{family.active}</div>
                    </Col>
                )

            }



          const actionDeleteButton = (index) => (
                <div>
                    <Glyphicon glyph="trash" className="location-action" 
                        onClick={() => this.delete(index)} />
                </div>
            );

            const detailWithEdit = (family, idx) => {

                const lookupGender = this.state.lookupGender.map ( div =>
                    <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
                );

                const lookupFamily = this.state.lookupFamily.map ( div =>
                    <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
                );

                const dob = new Date(family.dob);

                const textField = {
                    width: '100',
                    display: 'inline-flex',
                    marginRight: '20'
                }

                return (
                    <Col sm={10} md={7}>
                        <div className="input-group">
                            <TextField
                                style={textField}
                                id={'name' + idx}
                                value={family.name}
                                onChange={(object, value) => this.handleChangeValue(object, value, 'name', idx)}
                            />
                            <SelectField
                                id={'gender' + idx}
                                value={family.gender}
                                style={textField}
                                floatingLabelText="gender"
                                onChange={(object, index, value) =>  this.handleChangeValue(object, value, 'gender', idx)}
                                disabled={this.props.viewMode} >
                                {lookupGender}
                            </SelectField>
                            <DatePicker
                                id={'dob' + idx}
                                style={textField}
                                textFieldStyle={textField}
                                value={dob}
                                floatingLabelText="DOB"
                                onChange={(object, value) =>  this.handleChangeValue(object, value, 'dob', idx)}
                                autoOk={true}
                                disabled={this.props.viewMode}
                            />
                            
                            <SelectField
                                id={'type' + idx}
                                className="form-inline"
                                style={textField}
                                value={family.type}
                                floatingLabelText="Type"
                                onChange={(object, index, value) =>  this.handleChangeValue(object, value, 'type', idx)}
                                disabled={this.props.viewMode} >
                                {lookupFamily}
                            </SelectField>
                            <Checkbox
                              id={'active' + idx}
                              style={textField}
                              className="form-inline"
                              label="Active"
                              checked={family.active}
                              onCheck={(object, value) =>  this.handleChangeValue(object, value, 'active', idx)}
                            />
                        </div>
                    </Col>
                    )
            }

            const maps =   this.props.employeeTemp.families ? this.props.employeeTemp.families.map((family, idx) =>
                (
                      <Grid key={idx} >
                        <Row className="show-grid">
                            { this.props.viewMode ? detailNoEdit(family) : 
                                    detailWithEdit(family, idx) }

                            { this.props.viewMode ? null : actionDeleteButton(idx)}
                        </Row>
                      </Grid>
                )): null;

            const addButton = (
                <div className="location-float-button">
                    <FloatingActionButton secondary={true} onClick={this.add}>
                      <ContentAdd />
                    </FloatingActionButton>
                </div>
            );

        	return (

                <div className="content-container">
                    <h2 className="content-header">Family</h2> 
                    <div className="content">
                        <form>
                             {maps}
                        </form>
                    </div>

                    { !this.props.viewMode ? addButton : null  }

                </div>
        	);
        }
}

export default DetailFamily;