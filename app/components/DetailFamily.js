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


class DetailFamily extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }
  

    render() {
            debugger
        	return (

                <div className="content-container">
                    <h2 className="content-header">Family</h2> 
                    <div className="content">
                    
                    { this.props.employeeTemp.families && this.props.employeeTemp.families.map((family, index) => 
                            (

                                <div key={index}> {family.name} </div>
                            )
                        ) 
                    }
                    </div>
                </div>
        	);
        }
}

export default DetailFamily;