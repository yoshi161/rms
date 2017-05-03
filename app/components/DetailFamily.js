import React, {Component} from 'react';
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';
import update from 'react-addons-update';
import _  from 'lodash';


import moment from 'moment-es6';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import LookupData from '../data/LookupData';
import { initialize, reduxForm, Field, FieldArray, SubmissionError, Form, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {textComponent, selectComponent, datePickerComponent} from './reduxForms';


class DetailFamily extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            familyTemp: {
                name: "New Name",
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

            const families = this.props.employeeTemp.families;

            const detailNoEdit = (that, families) => {

                return families.map((row, index) => {
                    const type = _.find(that.state.lookupFamily, {'code': row.type}).desc;
                    const gender = _.find(that.state.lookupGender, {'code': row.gender}).desc;
                    const dob = row.dob ? moment(row.dob).format("MMM DD, YYYY") : "";

                     return (     
                        <TableRow key={index}>
                            <TableRowColumn>{row.name}</TableRowColumn>
                            <TableRowColumn>{gender}</TableRowColumn>
                            <TableRowColumn>{dob}</TableRowColumn>
                            <TableRowColumn>{type}</TableRowColumn>
                            <TableRowColumn>
                                <Checkbox
                                  id={'active' + index}
                                  disabled={true}
                                  checked={row.active}/>
                            </TableRowColumn>
                            <TableRowColumn>
                            </TableRowColumn>
                        </TableRow>
                        )
                })

            }

           const actionDeleteButton = (index) => (
                <div>
                    <Glyphicon glyph="trash" className="location-action" 
                        onClick={() => this.delete(index)} />
                </div>
            );

            const detailWithEdit = (families) => {

            const lookupGender = this.state.lookupGender.map ( div =>
                <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
            );

            const lookupFamily = this.state.lookupFamily.map ( div =>
                <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
            );

             return families.map((row, idx) =>{
                 const dob = new Date(row.dob);
                    return (
                        <TableRow key={idx}>
                            <TableRowColumn>                           
                                 <TextField
                                        id={'name' + idx}
                                        value={row.name}
                                        onChange={(object, value) => this.handleChangeValue(object, value, 'name', idx)}
                                    />
                            </TableRowColumn>
                            <TableRowColumn>
                                <SelectField
                                    id={'gender' + idx}
                                    value={row.gender}
                                    onChange={(object, index, value) =>  this.handleChangeValue(object, value, 'gender', idx)}>
                                    {lookupGender}
                                </SelectField>
                            </TableRowColumn>
                            <TableRowColumn>
                                <DatePicker
                                    id={'dob' + idx}
                                    value={dob}
                                    onChange={(object, value) =>  this.handleChangeValue(object, value, 'dob', idx)}
                                    autoOk={true} />
                            </TableRowColumn>
                            <TableRowColumn>
                                <SelectField
                                    id={'type' + idx}
                                    value={row.type}
                                    onChange={(object, index, value) =>  this.handleChangeValue(object, value, 'type', idx)}
                                    >
                                    {lookupFamily}
                                </SelectField>
                            </TableRowColumn>
                            <TableRowColumn>
                                <Checkbox
                                  id={'active' + idx}
                                  checked={row.active}
                                  onCheck={(object, value) =>  this.handleChangeValue(object, value, 'active', idx)} />
                            </TableRowColumn>
                            <TableRowColumn>
                                {actionDeleteButton(idx)}
                            </TableRowColumn>
                        </TableRow>
                    )})
            }

            const maps = families && families.length > 0 ? 
                    this.props.viewMode ? detailNoEdit(this, families) : 
                        detailWithEdit(families) : null;

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
                        <Table>
                            <TableHeader
                                displaySelectAll={false} >
                                <TableRow>
                                    <TableHeaderColumn style={{ width: '10px' }}></TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Gender</TableHeaderColumn>
                                    <TableHeaderColumn>DOB</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Active</TableHeaderColumn>
                                    <TableHeaderColumn></TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                    stripedRows={true}
                                    showRowHover={true} >
                                     {maps}
                                </TableBody>
                        </Table>
                    </div>

                    { !this.props.viewMode ? addButton : null  }
            </div>
        );
        }
}

export default DetailFamily;