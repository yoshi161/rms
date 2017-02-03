import React, {Component} from 'react';
import update from 'react-addons-update';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DetailDependentDetail from './DetailDependentDetail'

class DetailDependent extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleAddDetailDependent(){
        var nextState = update(this.props, {
            employee: {
                dependents: { $push:
                    [
                        {
                        name: '',
                        dob: new Object,
                        gender: '',
                        type: '',
                        active: true
                        }
                    ]
                }
            }
        });
        this.handleUpdateDetailDependent(nextState.employee);
    }

    handleChangeValue(indexDependents, event, type) {
        var nextState = update(this.props, {
            employee: {
                dependents: {
                    [indexDependents]: {
                         [type]: {$set: event.target.value}
                    }
                }
            }
        });
        this.handleUpdateDetailDependent(nextState.employee);
    }

    handleChangeSelectValue(indexDependents, event, index, value, type) {
        var nextState = update(this.props, {
            employee: {
                dependents: {
                    [indexDependents]: {
                         [type]: {$set: value}
                    }
                }
            }
        });
        this.handleUpdateDetailDependent(nextState.employee);
    }

    handleChangeDateValue(indexDependents, event, date, type) {
        var nextState = update(this.props, {
            employee: {
                dependents: {
                    [indexDependents]: {
                         [type]: {$set: date}
                    }
                }
            }
        });
        this.handleUpdateDetailDependent(nextState.employee);
    }

    handleChangeCheckedValue(indexDependents, event, checked, type){
        var nextState = update(this.props, {
            employee: {
                dependents: {
                    [indexDependents]: {
                         [type]: {$set: event.target.checked}
                    }
                }
            }
        });
        this.handleUpdateDetailDependent(nextState.employee);
    }

    handleUpdateDetailDependent(employee){
        this.props.setCurrentEmployee(employee);
    }

    handleDeleteDetailDependent(indexDependents){
        var nextState = update(this.props, {
            employee: {
                dependents: {
                    $splice: [[indexDependents, 1]]
                }
            }
        });
        this.handleUpdateDetailDependent(nextState.employee);
    }

    render() {

        var dependents = this.props.employee.dependents;
        var detailDependentDetail = {}
        if ( dependents.length > 0 ){
            detailDependentDetail = dependents.map ((dependent, index) =>
                <DetailDependentDetail
                    key={index}
                    index={index}
                    dependent={dependent}
                    errorTextRequired={this.props.errorTextRequired}
                    viewMode={this.props.viewMode}
                    handleChangeValue={this.handleChangeValue.bind(this)}
                    handleChangeSelectValue={this.handleChangeSelectValue.bind(this)}
                    handleChangeDateValue={this.handleChangeDateValue.bind(this)}
                    handleChangeCheckedValue={this.handleChangeCheckedValue.bind(this)}
                    handleDeleteDetailDependent={this.handleDeleteDetailDependent.bind(this)}
                    />
            )
        }

        return(
            <div className="content-container">
                <h2 className="content-header">Family Member</h2>
                    <div className="content">
                        <Table>
                            <TableHeader
                                displaySelectAll={false} >
                                <TableRow>
                                    <TableHeaderColumn style={{ width: '10px' }}></TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Gender</TableHeaderColumn>
                                    <TableHeaderColumn>Date of Birth</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Active</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            {
                                dependents.length > 0 ?
                                <TableBody
                                    displayRowCheckbox={false}
                                    stripedRows={true}
                                    showRowHover={true} >
                                            {detailDependentDetail}
                                </TableBody> :
                                <TableBody
                                    displayRowCheckbox={false} >
                                        <TableRow>
                                            <TableRowColumn>
                                                <div className="no-record">
                                                <span>No Record Found</span>
                                                </div>
                                            </TableRowColumn>
                                        </TableRow>
                                </TableBody>
                            }
                        </Table>
                    </div>
                    <div>
                        <FloatingActionButton
                            className="sort-criteria-add"
                            onTouchTap={this.handleAddDetailDependent.bind(this)}
                            secondary={true} mini={true}
                            disabled={this.props.viewMode}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
            </div>
        );
    }
}

export default DetailDependent;