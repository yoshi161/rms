import React, {Component} from 'react';
import update from 'react-addons-update';
import NumericInput from 'react-numeric-input';

import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Constants from '../data/Constants';
import LookupData from '../data/LookupData';

class DetailGradeDetail extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
           lookupGrade: LookupData.grade,
        }
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

    render() {

        var lookupGrade = this.state.lookupGrade.map ( grade =>
            <MenuItem key={grade.code} value={grade.code} primaryText={grade.desc} />
        );

        return(
            <TableRow>
                {
                    (this.props.gradeHistLength-1==this.props.index)&&(this.props.gradeHistLength>1)  ?
                    <TableRowColumn style={{ width: '10px' }}>
                        <IconButton className="content-x"
                            onTouchTap={this.props.handleDeleteDetailGrade.bind(this, this.props.index)}
                            iconStyle={Constants.smallIcon}
                            disabled={this.props.viewMode} >
                            <NavigationClose />
                        </IconButton>
                    </TableRowColumn> :
                    <TableRowColumn style={{ width: '10px' }}/>
                }
                <TableRowColumn>
                    <NumericInput
                        size="2"
                        min={1}
                        max={20}
                        onChange={event => this.handleChangeValue(event, 'devStage')}
                        value={this.props.grade.devStage}
                        disabled={this.props.viewMode} />
                </TableRowColumn>
                <TableRowColumn>
                    <SelectField
                        value={this.props.grade.grade}
                        hintText="Grade"
                        errorText={this.props.grade.grade==""?this.props.errorTextRequired:""}
                        onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'grade')}
                        disabled={this.props.viewMode}
                        underlineShow={false} >
                        {lookupGrade}
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn>
                    <DatePicker
                        value={this.props.grade.startDate}
                        hintText="Start Date"
                        errorText={this.props.grade.startDate==""?this.props.errorTextRequired:""}
                        onChange={(event, date) =>  this.handleChangeDateValue(event, date, 'startDate')}
                        autoOk={true}
                        disabled={this.props.viewMode}
                        underlineShow={false}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <DatePicker
                        value={this.props.grade.endDate}
                        hintText="End Date"
                        errorText={this.props.grade.endDate==""?this.props.errorTextRequired:""}
                        onChange={(event, date) =>  this.handleChangeDateValue(event, date, 'endDate')}
                        autoOk={true}
                        disabled={this.props.viewMode}
                        underlineShow={false}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }
}

export default DetailGradeDetail;