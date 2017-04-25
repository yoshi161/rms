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
            locationTemp: {
                from: new Date(),
                to: new Date(),
                location: "JOG",
                address: "new address",
            }
        }
		this.changeEdit = this.changeEdit.bind(this);
		this.dataChanged = this.dataChanged.bind(this);
		this.save = this.save.bind(this);
		this.create = this.create.bind(this);
		this.delete2 = this.delete2.bind(this);
        this.locationAddressInput = this.locationAddressInput.bind(this);
    }


    save() {
        this.props.handleUpdateEmployee();
        this.setState({
            viewMode: true
        });
    }

    create() {
        const current = update(this.props, {
            employeeTemp: {
                locations: {$push: [this.state.locationTemp]}
            }
        });

        this.props.setCurrentEmployeeTemp(current.employeeTemp);

        this.props.editEmployee(current.employeeTemp.id, 
            current.employeeTemp);
    }

    delete2(index) {
      this.state.employees.splice(index,1);
      this.setState({
         employees: this.state.employees
      });
    }

    handleChangeValue(event, type) {
        var propsTemp = update(this.props, {
             employeeTemp: {[type]: {$set: event.target.value}}
        });

        this.props.setCurrentEmployeeTemp(propsTemp);
    }

    handleChangeSelectValue(event, index, value, type) {
        debugger
        var locationsTemp = this.props.employeeTemp.locations;
        locationsTemp[index][type] = value; 
        var propsTemp = update(this.props.employeeTemp, {
             locations: {$set: locationsTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    handleChangeDateValue(event, date, type) {
        var propsTemp = update(this.props, {
             employeeTemp: {[type]: {$set: date}}
        });
        this.props.setCurrentEmployeeTemp(propsTemp);
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

    locationAddressInput (emp) {
        return (
            <div className="location-address">
                <TextField hintText="Address"
                    value={emp.address}
                    onChange={event => this.handleChangeValue(event, 'address')}/>
            </div>
        );

    }

    render() {


        var modalStyle = {
            width: 800
        };
		
		
        var lookupOffice = this.state.lookupOffice.map ( office =>
            <MenuItem key={office.code} value={office.code} primaryText={office.desc} />
        );

		var actions = function(event, index, asd) {

		    var that = asd;
		    var idx = index;
            return (
                <div>
                    <Glyphicon glyph="trash" className="location-action" onClick={() => that.delete2(idx)} />
                </div>
            );
		}

		var  popupActions = (
            <div>
                <Glyphicon glyph="floppy-disk" className="location-action" onClick={this.save}/>
            </div>
		);

		var locationField = function (emp) {
            return <div className="location-address">{emp.address}</div>
		}

        var a = this.props.employeeTemp;
		var mapped = a.locations.map((emp, idx) =>
            (
				  <Grid key={idx} >
					<Row className="show-grid">
						<Col sm={3} md={3} className="location-time">
							<div className="location-month"> November - February 
                            {idx}</div>
							<div className="location-year"> 2016-PRESENT </div>
						</Col>
						<Col sm={4} md={4} >
							<SelectField
								value={emp.location}
								floatingLabelText="Office"
								errorText={emp.office==""?this.props.errorTextRequired:""}
								onChange={(event, idx, value) =>  this.handleChangeSelectValue(event, idx, value, 'location')} 
                                disabled={this.props.viewMode} >
								{lookupOffice}
							</SelectField>
							<div> Address </div>
							{ this.props.viewMode ? locationField(emp) : null }
							{ !this.props.viewMode ? this.locationAddressInput(emp) : null }
						</Col>
						<Col sm={4} md={2} >
							{ this.props.viewMode ? actions(event, idx, this) : null }
							{ !this.props.viewMode ? popupActions : null }
						</Col>
					</Row>
				  </Grid>
            )
		);


        return(
            <div className="content-container">
                <h2 className="content-header">Location</h2>
                <div className="content" style={modalStyle}>
                    {mapped}
                </div>
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