import React, {Component} from 'react';
import update from 'react-addons-update';

import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';

import DetailGradeDetail from './DetailGradeDetail'

class DetailGrade extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleAddDetailGrade(){
        var nextState = update(this.props, {
            employee: {
                gradeHistory: { $push:
                    [
                        {
                            startDate: new Object,
                            endDate: new Object,
                            grade: '',
                            devStage: this.props.employee.gradeHistory[this.props.employee.gradeHistory.length-1].devStage || 0
                        }
                    ]
                }
            }
        });
        this.handleUpdateDetailGrade(nextState.employee);
    }

    handleChangeValue(indexGrade, event, type) {
        var nextState = update(this.props, {
            employee: {
                gradeHistory: {
                    [indexGrade]: {
                         [type]: {$set: event}
                    }
                }
            }
        });
        this.handleUpdateDetailGrade(nextState.employee);
    }

    handleChangeSelectValue(indexGrade, event, index, value, type) {
        var nextState = update(this.props, {
            employee: {
                gradeHistory: {
                    [indexGrade]: {
                         [type]: {$set: value}
                    }
                }
            }
        });
        this.handleUpdateDetailGrade(nextState.employee);
    }

    handleChangeDateValue(indexGrade, event, date, type) {
        var nextState = update(this.props, {
            employee: {
                gradeHistory: {
                    [indexGrade]: {
                         [type]: {$set: date}
                    }
                }
            }
        });
        this.handleUpdateDetailGrade(nextState.employee);
    }

    handleUpdateDetailGrade(employee){
        this.props.setCurrentEmployee(employee);
    }

    handleDeleteDetailGrade(indexGrade){
        var nextState = update(this.props, {
            employee: {
                gradeHistory: {
                    $splice: [[indexGrade, 1]]
                }
            }
        });
        this.handleUpdateDetailGrade(nextState.employee);
    }


    render() {
        var gradeHist = this.props.employee.gradeHistory;
        gradeHist.reverse();
        var detailGrade = gradeHist.map ( (grade, index) =>
            <DetailGradeDetail
                key={index}
                index={gradeHist.length-index-1}
                gradeHistLength={gradeHist.length}
                grade={grade}
                errorTextRequired={this.props.errorTextRequired}
                viewMode={(-index)?true:this.props.viewMode}
                handleChangeValue={this.handleChangeValue.bind(this)}
                handleChangeSelectValue={this.handleChangeSelectValue.bind(this)}
                handleChangeDateValue={this.handleChangeDateValue.bind(this)}
                handleDeleteDetailGrade={this.handleDeleteDetailGrade.bind(this)}
            />
        )
        gradeHist.reverse();

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
                                            {detailGrade}
                                </TableBody>
                        </Table>
                    </div>
                    {
                        (!this.props.fromAddEmployee) ?
                        (<div>
                            <FloatingActionButton
                                className="sort-criteria-add"
                                onTouchTap={this.handleAddDetailGrade.bind(this)}
                                secondary={true} mini={true}
                                disabled={this.props.viewMode}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>) : ('')
                    }
            </div>
        );
    }
}

export default DetailGrade;