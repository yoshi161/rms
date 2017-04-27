import React, {Component} from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
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


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class DetailLocation extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lookupOffice: LookupData.office,
			viewMode: props.viewMode,
            locationTemp: {
                from: new Date(),
                to: new Date(),
                location: "DPS",
                address: "new address",
            }
        }
        
		this.save = this.save.bind(this);
		this.add = this.add.bind(this);
        this.locationAddressInput = this.locationAddressInput.bind(this);
    }


    save() {
        this.props.handleUpdateEmployee();
        this.setState({
            viewMode: true
        });
    }

    add() {
        const current = update(this.props, {
            employeeTemp: {
                locations: {$push: [Object.assign({}, this.state.locationTemp)]}
            }
        });

        this.props.setCurrentEmployeeTemp(current.employeeTemp);
    }

    deleteLocation(index) {
        var locationsTemp = _.cloneDeep(this.props.employeeTemp.locations);
        locationsTemp.splice(index, 1); 
        var propsTemp = update(this.props.employeeTemp, {
             locations: {$set: locationsTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    handleChangeValue(object, value, type, idx) {
        var locationsTemp = _.cloneDeep(this.props.employeeTemp.locations);
        locationsTemp[idx][type] = value; 
        var propsTemp = update(this.props.employeeTemp, {
             locations: {$set: locationsTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }

    handleChangeSelectValue(event, number, value, type, idx) {
        var locationsTemp = _.cloneDeep(this.props.employeeTemp.locations);
        locationsTemp[idx][type] = value; 
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

    locationAddressInput (emp, idx) {
        return (
            <div className="location-address">
                <TextField hintText="Address"
                    value={emp.address}
                    onChange={(object, value) => this.handleChangeValue(object, value, 'address', idx)}/>
            </div>
        );

    }

    locationDateInput (emp, idx) {
        const from = new Date(emp.from);
        const to = new Date(emp.to);
        return (
                <Col sm={3} md={3} className="location-time">
                    <DatePicker
                        value={from}
                        floatingLabelText="From"
                        errorText={this.props.employeeTemp.from==""?this.props.errorTextRequired:""}
                        onChange={(object, value) => this.handleChangeValue(object, value, 'from', idx)}
                        autoOk={true}
                    />
                    <DatePicker
                        value={to}
                        floatingLabelText="To"
                        errorText={this.props.employeeTemp.from==""?this.props.errorTextRequired:""}
                        onChange={(object, value) => this.handleChangeValue(object, value, 'to', idx)}
                        autoOk={true}
                    />
                </Col>
            );
    }

    locationDateDisable (emp) {
        const monthFrom = monthNames[new Date(emp.from).getMonth()];
        const yearFrom = new Date(emp.from).getFullYear();
        const monthTo = monthNames[new Date(emp.to).getMonth()];
        const yearTo = new Date(emp.to).getFullYear();
        return (
                <Col sm={3} md={3} className="location-time">
                    <div className="location-month"> {monthFrom} - {monthTo} </div>
                    <div className="location-year"> {yearFrom} - {yearTo} </div>
                </Col>
            );

    }
                        

    render() {
        var modalStyle = {
            width: 800
        };
		
		
        var lookupOffice = this.state.lookupOffice.map ( office =>
            <MenuItem key={office.code} value={office.code} primaryText={office.desc} />
        );

		var actionButton = function(index, item) {
            const that = item;
            return (
                <div>
                    <Glyphicon glyph="trash" className="location-action" 
                        onClick={() => that.deleteLocation(index)} />
                </div>
            );
		}

		var locationField = function (emp) {
            return <div className="location-address">{emp.address}</div>
		}

        var empTemp = this.props.employeeTemp;
		var maps =  empTemp. locations ? empTemp.locations.map((emp, idx) =>
            (
				  <Grid key={idx} >
					<Row className="show-grid">
                        { this.props.viewMode ? this.locationDateDisable(emp) : this.locationDateInput(emp, idx) }
						<Col sm={4} md={4} >
							<SelectField
								value={emp.location}
								floatingLabelText="Office"
								errorText={emp.office==""?this.props.errorTextRequired:""}
								onChange={(event, number, value) =>  this.handleChangeSelectValue(event, number, value, 'location', idx)} 
                                disabled={this.props.viewMode} >
								{lookupOffice}
							</SelectField>
							<div> Address </div>
							{ this.props.viewMode ? locationField(emp) : this.locationAddressInput(emp, idx) }
						</Col>
						<Col sm={4} md={2} >
							{ !this.props.viewMode ? actionButton(idx, this) : null  }
						</Col>
					</Row>
				  </Grid>
            ) 
		): null;

        const addButton = (
                <div className="location-float-button">
                    <FloatingActionButton secondary={true} onClick={this.add}>
                      <ContentAdd />
                    </FloatingActionButton>
                </div>
                );


        return(
            <div className="content-container">
                <h2 className="content-header">Location</h2>
                <div className="content" style={modalStyle}>
                    {maps}
                </div>
                    { !this.props.viewMode ? addButton : null  }
            </div>
        );
    }
}

export default DetailLocation;