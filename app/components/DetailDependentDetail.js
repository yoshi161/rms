import React, {Component} from 'react';
import update from 'react-addons-update';

import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Constants from '../data/Constants';

class DetailDependentDetail extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleChangeValue(event, type) {
        this.props.handleChangeValue(this.props.index, event, type)
    }

    handleChangeSelectValue(event, index, value, type) {
        this.props.handleChangeSelectValue(this.props.index, event, index, value, type)
    }

    handleChangeDateValue(event, date, type) {
        this.props.handleChangeDateValue(this.props.index, event, date, type)
    }

    handleChangeCheckedValue(event, checked, type) {
        this.props.handleChangeCheckedValue(this.props.index, event, checked, type)
    }

    render() {
        return(
            <TableRow>
                <TableRowColumn style={{ width: '10px' }}>
                    <IconButton className="content-x"
                        onTouchTap={this.props.handleDeleteDetailDependent.bind(this, this.props.index)}
                        iconStyle={Constants.smallIcon}
                        disabled={this.props.viewMode}>
                        <NavigationClose />
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField
                        value={this.props.dependent.name}
                        hintText="First Name"
                        errorText={this.props.dependent.name==""?this.props.errorTextRequired:""}
                        onChange={event => this.handleChangeValue(event, 'name')}
                        disabled={this.props.viewMode}
                        underlineShow={false}
                        />
                </TableRowColumn>
                <TableRowColumn>
                    <SelectField
                        value={this.props.dependent.gender}
                        hintText="Gender"
                        errorText={this.props.dependent.gender==""?this.props.errorTextRequired:""}
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'gender')}
                        disabled={this.props.viewMode}
                        underlineShow={false} >
                        <MenuItem value={"M"} primaryText="Male" />
                        <MenuItem value={"F"} primaryText="Female" />
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn>
                    <DatePicker
                        value={this.props.dependent.dob}
                        hintText="Date of Birth"
                        errorText={this.props.dependent.dob==""?this.props.errorTextRequired:""}
                        onChange={(event, date) =>  this.handleChangeDateValue(event, date, 'dob')}
                        autoOk={true}
                        disabled={this.props.viewMode}
                        underlineShow={false}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <SelectField
                        value={this.props.dependent.type}
                        hintText="Type"
                        errorText={this.props.dependent.type==""?this.props.errorTextRequired:""}
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'type')}
                        disabled={this.props.viewMode}
                        underlineShow={false} >
                        <MenuItem value={"W"} primaryText="Wife" />
                        <MenuItem value={"C"} primaryText="Child" />
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn>
                    <Checkbox
                        checked={this.props.dependent.active}
                        onClick={(event, checked) => this.handleChangeCheckedValue(event, checked, 'active')}
                        disabled={this.props.viewMode}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }
}

export default DetailDependentDetail;




