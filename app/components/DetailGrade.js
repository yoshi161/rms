import React, {Component} from 'react';
import update from 'react-addons-update';
import moment from 'moment-es6';

import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';

import DetailGradeDetail from './DetailGradeDetail'

import LookupData from '../data/LookupData';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class DetailGrade extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            gradeTemp : {
                ds: "1",
                grade: "JP",
                start: new Date(),
                end: new Date(),
            },
            lookupDevStage: LookupData.devStage,
            lookupGrade: LookupData.grade
        }
        this.add = this.add.bind(this);
    }


    add() {
        const current = update(this.props, {
            employeeTemp: {
                grades: {$push: [_.cloneDeep(this.state.gradeTemp)]}
            }
        });

        this.props.setCurrentEmployeeTemp(current.employeeTemp);
    }



    handleChangeValue(object, value, type, idx) {
        var historiesTemp = _.cloneDeep(this.props.employeeTemp.grades);
        historiesTemp[idx][type] = value; 
        var propsTemp = update(this.props.employeeTemp, {
             grades: {$set: historiesTemp} 
             
        });
        this.props.setCurrentEmployeeTemp(propsTemp); 
    }


    render() {
        const grades = this.props.employeeTemp.grades;




        const detailNoEdit = (that, grades) => {

            return grades.map((row, index) => {
                const start = row.start ? moment(row.start, "mm/dd/yyyy") : "";
                const end = row.end ? moment(row.end, "mm/dd/yyyy") : "";
                const ds = _.find(that.state.lookupDevStage, {'code': row.ds}).desc;
                const grade = _.find(that.state.lookupGrade, {'code': row.grade}).desc;


                 return (     
                    <TableRow key={index}>
                        <TableRowColumn>{ds}</TableRowColumn>
                        <TableRowColumn>{grade}</TableRowColumn>
                        <TableRowColumn>{start}</TableRowColumn>
                        <TableRowColumn>{end}</TableRowColumn>
                    </TableRow>
                    )
                })

        }

        const detailWithEdit = (grades) => {



            const lookupDevStage= this.state.lookupDevStage.map ( div =>
                <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
            );

            const lookupGrade= this.state.lookupGrade.map ( div =>
                <MenuItem key={div.code} value={div.code} primaryText={div.desc} />
            );

            return grades.map((row, index) => {
                    const start = new Date(row.start);
                    const end = new Date(row.end);
                    return (
                          <TableRow key={index}>
                            <TableRowColumn>
                                <SelectField
                                    id={'ds' + index}
                                    value={row.ds}
                                    onChange={(object, idx, value) =>  this.handleChangeValue(object, value, 'ds', index)} >
                                    {lookupDevStage}
                                </SelectField>
                            </TableRowColumn>
                            <TableRowColumn>
                                <SelectField
                                    id={'grade' + index}
                                    value={row.grade}
                                    onChange={(object, idx, value) =>  this.handleChangeValue(object, value, 'grade', index)} >
                                    {lookupGrade}
                                </SelectField>
                            </TableRowColumn>
                            <TableRowColumn>
                                <DatePicker
                                    id={'start' + index}
                                    value={start}
                                    onChange={(object, value) =>  this.handleChangeValue(object, value, 'start', index)}
                                    autoOk={true}
                                />
                            </TableRowColumn>
                            <TableRowColumn>
                                <DatePicker
                                    id={'end' + index}
                                    value={end}
                                    onChange={(object, value) =>  this.handleChangeValue(object, value, 'end', index)}
                                    autoOk={true}
                                />
                            </TableRowColumn>
                          </TableRow>
                    )
                });
        };

        const addButton = (
            <div className="location-float-button">
                <FloatingActionButton secondary={true} onClick={this.add}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        );

        var maps = grades && grades.length > 0 ? 
                    this.props.viewMode ? detailNoEdit(this, grades) : 
                        detailWithEdit(grades) : null;


        return(
            <div className="content-container">
                <h2 className="content-header">Grade</h2>
                    <div className="content">
                        <Table>
                            <TableHeader
                                displaySelectAll={false} >
                                <TableRow>
                                    <TableHeaderColumn style={{ width: '10px' }}></TableHeaderColumn>
                                    <TableHeaderColumn>Dev Stage</TableHeaderColumn>
                                    <TableHeaderColumn>Grade</TableHeaderColumn>
                                    <TableHeaderColumn>Start Date</TableHeaderColumn>
                                    <TableHeaderColumn>End Date</TableHeaderColumn>
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

export default DetailGrade;