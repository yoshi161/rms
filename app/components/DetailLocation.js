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

class DetailLocation extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lookupOffice: LookupData.office,
			viewMode: props.viewMode,
            employees:[{
                office: 'SBY',
                address: "aaaaaaaaaaa",
            },{
                office: 'SBY',
                address: "bbbbbbbbb"
            }],
            employee: {
                office: "",
                address: "",
                index: null
            }
        }
		this.changeEdit = this.changeEdit.bind(this);
		this.dataChanged = this.dataChanged.bind(this);
		this.save = this.save.bind(this);
		this.create = this.create.bind(this);
		this.delete2 = this.delete2.bind(this);
    }

    save() {
        debugger
        if (this.state.model === "new") {
            this.state.employees.push(this.state.employee);
            var a = this.state.employees;
            this.setState({
                viewMode: true,
                employees: a
            });
        }   else {
            var index = this.state.employee.index;
            this.state.employees[index] = this.state.employee;
            this.setState({
                viewMode: true
            });
        }
    }

    create() {
        this.setState({
            viewMode: false,
            employee: {
                office: "",
                address: ""
            },
            model: "new"
        });
    }

    delete2(index) {
      this.state.employees.splice(index,1);
      this.setState({
         employees: this.state.employees
      });
    }

    handleChangeValue(event, type) {
        debugger
        var a = update(this.state, {
             employee: {[type]: {$set: event.target.value}}
        });
        
        this.forceUpdate();
      //  this.setState({employee: a});
       // this.props.setCurrentEmployee(nextState.employee);
      //  this.setState({employee: nextState.employee});
    }

    handleChangeSelectValue(event, index, value, type) {
        var nextState = update(this.props, {
             employee: {[type]: {$set: value}}
        });
        this.props.setCurrentEmployee(nextState.employee);
    }

    handleChangeDateValue(event, date, type) {
        var nextState = update(this.props, {
             employee: {[type]: {$set: date}}
        });
        this.props.setCurrentEmployee(nextState.employee);
    }

    setNewEmployee() {

    }
	
	changeEdit(index) {
        var a = this.state.employees[index];
        a.index = index;
    //    a.address = index;
		this.setState({viewMode: false,
		                employee: a,
		                model: "edit"});
	}

	dataChanged(event, type) {
	    var value = event.target.value;
        update(this.props, {
            employee: {
                [type]: {$set: value}
            }
        });
	}

    handleCloseDialog() {
        this.setState({
            viewMode: true,
            model:""
        });
    }

    render() {


        var modalStyle = {
            width: 800
        };
		
		
        var lookupOffice = this.state.lookupOffice.map ( office =>
            <MenuItem key={office.code} value={office.code} primaryText={office.desc} />
        );
/*
        var actions = (

                <div>
                    <Glyphicon glyph="pencil" className="location-action" onClick={this.changeEdit} />
                    <Glyphicon glyph="trash" className="location-action" onClick={this.delete2(index)} />
                </div>
        ); */

		var actions = function(event, index, asd) {

		    var that = asd;
		    var idx = index;
            return (
                <div>
                    <Glyphicon glyph="pencil" className="location-action" onClick={() => that.changeEdit(idx)} />
                    <Glyphicon glyph="trash" className="location-action" onClick={() => that.delete2(idx)} />
                </div>
            );
		}

		var  popupActions = (
            <div>
                <Glyphicon glyph="floppy-disk" className="location-action" onClick={this.save}/>
            </div>
		);

		var locationAddressInput = (
            <div className="location-address">
                <TextField hintText="Address"
                    value={this.state.employee.address}
                    onChange={event => this.handleChangeValue(event, 'address')}/>
            </div>
		);

		var locationField = function (emp) {
            return <div className="location-address">{emp.address}</div>
		}

		var asdf = this.state.employees.map((emp, index) =>
            (
				  <Grid >
					<Row className="show-grid">
						<Col sm={3} md={3} className="location-time">
							<div className="location-month"> November - February </div>
							<div className="location-year"> 2016-PRESENT </div>
						</Col>
						<Col sm={4} md={4} >
							<SelectField
								value={this.props.employee.office}
								floatingLabelText="Office"
								errorText={this.props.employee.office==""?this.props.errorTextRequired:""}
								onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'office')} disabled={this.state.viewMode} >
								{lookupOffice}
							</SelectField>
							<div> Address </div>
							{ this.state.viewMode ? locationField(emp) : null }
							{ !this.state.viewMode ? locationAddressInput : null }
						</Col>
						<Col sm={4} md={2} >
							{ this.state.viewMode ? actions(event, index, this) : null }
							{ !this.state.viewMode ? popupActions : null }
						</Col>
					</Row>
				  </Grid>
            )
		);

		var a = (
              <Grid>
                <Row className="show-grid">
                    <Col sm={3} md={3} className="location-time">
                        <div className="location-month"> November - February </div>
                        <div className="location-year"> 2016-PRESENT </div>
                    </Col>
                    <Col sm={4} md={4} >
                        <SelectField
                            value={this.props.employee.office}
                            floatingLabelText="Office"
                            errorText={this.props.employee.office==""?this.props.errorTextRequired:""}
                            onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'office')} disabled={this.state.viewMode} >
                            {lookupOffice}
                        </SelectField>
                        <div> Address </div>
                        { this.state.viewMode ? locationField(this.state.employee) : null }
                        { !this.state.viewMode ? locationAddressInput : null }

                        <input type="hidden" name="index" value={this.state.employee.index} />
                    </Col>
                    <Col sm={4} md={2} >
                        { !this.state.viewMode ? popupActions : null }
                    </Col>
                </Row>
              </Grid>
		);


        return(
            <div className="content-container">
                <h2 className="content-header">Location</h2>
                <div className="content" style={modalStyle}>
                    {asdf}
                </div>
                <Dialog
                    open={!this.state.viewMode}
                    title="Location"
                    contentStyle={{width: "50%", maxWidth: "none", height:"65%", maxHeight:"none"}}
                    autoScrollBodyContent={true}
                    onRequestClose={this.handleCloseDialog.bind(this)}>
                    <div className="content-dialog" style={modalStyle}>
                        {a}
                    </div>
                </Dialog>
                <div className="location-float-button">
                    <FloatingActionButton secondary={true} onClick={this.create}>
                      <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default DetailLocation;