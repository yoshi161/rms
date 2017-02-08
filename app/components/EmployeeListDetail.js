import React, {Component} from 'react';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import {indigo400, grey400} from 'material-ui/styles/colors';

import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ToogleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';

import LookupData from '../data/LookupData';

import {Link} from 'react-router';
import {hashHistory} from 'react-router';

class EmployeeListDetail extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lookupDivision: LookupData.division,
            lookupGrade: LookupData.grade,
            lookupOffice: LookupData.office,
        }
    }

    handleTouchTap(currentEmployee){
        this.props.setCurrentEmployee(currentEmployee);
    }

    render() {
        var division = this.state.lookupDivision.filter(div => (div.code == this.props.employee.division));
        var grade = this.state.lookupGrade.filter(grade => (grade.code == this.props.employee.grade));
        var office = this.state.lookupOffice.filter(office => (office.code == this.props.employee.office));
        const link = id => {
            hashHistory.push('details/' + id);
           console.log(id);
        }
        return(
            <div>
                <Paper zDepth={1} >
                    <ListItem
                        leftAvatar={this.props.employee.active?
                            <Avatar src={require("../images/kholishul_a.jpg")}/>:
                            <Avatar>{this.props.employee.firstName.charAt(0)}</Avatar>}
                        rightIcon={<ToogleRadioButtonChecked color={this.props.employee.active? indigo400:grey400}  />}
                        onClick={() => link(this.props.employee.id)}
                    >
                    <span>
                        <b>{this.props.employee.firstName} {this.props.employee.lastName}</b><br/>
                        <small>{grade[0].desc}, {division[0].desc}<br/>
                        {office[0].desc}, {this.props.employee.phone}</small>
                    </span>
                    </ListItem>
                </Paper>
            </div>
        );
    }
}

export default EmployeeListDetail;