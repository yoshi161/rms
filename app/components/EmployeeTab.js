import React, {Component} from 'react';
import $ from 'jquery';

import update from 'react-addons-update';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionHome from 'material-ui/svg-icons/action/home';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import MapsLayers from 'material-ui/svg-icons/maps/layers';
import NotificationWc from 'material-ui/svg-icons/notification/wc';

import DetailEmployee from './DetailEmployee'
import DetailGrade from './DetailGrade'
import DetailDependent from './DetailDependent'
import DetailLocation from './DetailLocation'

import {hashHistory} from 'react-router';

import {DETAILS, LOCATION} from '../util/paths';

class EmployeeTab extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            deleteDialogIsOpen: false,
            validationDialogIsOpen: false,
            viewMode: true,
            gradeErrorTextRequired: '',
            depErrorTextRequired: '',
            path: this.defineActiveTab(this.props),
            employeeTemp: JSON.parse(JSON.stringify(this.props.employee))
        }

        this.defineActiveTab = this.defineActiveTab.bind(this);
        this.handleUpdateEmployee = this.handleUpdateEmployee.bind(this);
        this.setCurrentEmployeeTemp = this.setCurrentEmployeeTemp.bind(this);
    }

    defineActiveTab(nextProps) {
        const currentLocation = nextProps.location.pathname;
        const parsedPath = currentLocation.split("/");
        const location = parsedPath[parsedPath.length-1];
        let path = 0;

        switch(location) {
            case DETAILS:
                path = 0;
                break;
            case LOCATION:
                path = 1;
                break;
            default:
                path = 0;

        }

        return path;
    }

    componentWillReceiveProps(nextProps) {
        debugger
        const path = this.defineActiveTab(nextProps);
        this.setState({employeeTemp: JSON.parse(JSON.stringify(nextProps.employee)), path: path});

    }

    handleEditMode() {
        this.setState({
            viewMode: false
        })
    }

    handleUpdateEmployee(emps){
        if (    // Detail Employee
                this.props.employee.firstName=="" || this.props.employee.lastName=="" || this.props.employee.gender==""
                /*|| this.props.employee.dob=="" ||*/ || this.props.employee.phone=="" || this.props.employee.subDivision==""
                || this.props.employee.grade=="" || this.props.employee.division=="" || this.props.employee.email==""
                // Detail Grade History
                || (this.checkGrade())
                // Detail Dependents
                || ( this.checkDependent())
                // Detail Location
              //  || this.props.employee.office==""
                ){
                    // required fields are not filled yet
                    this.handleOpenValidationDialog();
        } else {
           this.props.editEmployee(this.props.employee.id, 
                this.state.employeeTemp);
            this.setState({
                viewMode: true,
                gradeErrorTextRequired: '',
                depErrorTextRequired: '',
            })
        }
    }

    handleCancel() {
        this.setState({
            viewMode: true,
            employeeTemp: JSON.parse(JSON.stringify(this.props.employee))
        })
    }

    handleDeleteEmployee(){
       this.props.deleteEmployee(this.state.employeeTemp.id);
       this.handleCloseDeleteDialog();
       hashHistory.push('/details'); 
    }

    handleOpenDeleteDialog() {
        this.setState({
            deleteDialogIsOpen: true,
            validationDialogIsOpen: false,
            viewMode: true,
        });
    }

    handleCloseDeleteDialog() {
        this.setState({
            deleteDialogIsOpen: false,
        });
    }

    handleOpenValidationDialog() {
        this.setState({
            validationDialogIsOpen: true,
        });
    }

    handleCloseValidationDialog() {
        this.setState({
            validationDialogIsOpen: false,
        });
    }

    checkGrade(){
        var rtn = false;
        var grade = this.props.employee.gradeHistory;

        if (grade.length > 0){
            grade.forEach ( grade => { if (grade.grade=="" )
                rtn = true;
                this.setState({
                    gradeErrorTextRequired: "This field is required!"
                })
            })
        }
        return rtn;
    }

    checkDependent(){
        var rtn = false;
        var dependents = this.props.employee.dependents;

        if (dependents.length > 0){
            dependents.forEach ( dependent => { if (dependent.name=="" || dependent.gender=="" || dependent.type=="" )
                rtn = true;
                this.setState({
                    depErrorTextRequired: "This field is required!"
                })
            })
        }
        return rtn;
    } 

    setCurrentEmployeeTemp(currentEmployee) {
        this.setState({
            employeeTemp: Object.assign({}, currentEmployee) 
        })
    }

    render() {
        console.log("revisited employee tab");
        const actionsDeleteBtn = [
            <RaisedButton
                label="Cancel"
                onTouchTap={this.handleCloseDeleteDialog.bind(this)}
            />,
            <RaisedButton
                label="Delete"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDeleteEmployee.bind(this)}
            />
        ];
        const actionsValidationBtn = [
            <RaisedButton
                label="Ok"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleCloseValidationDialog.bind(this)}
            />,
        ];

        const onActiveEmployee = () => hashHistory.push('details');

        const onActiveLocation = () => {
          const employeeId = this.state.employeeTemp.id;
          const path = '/details/'+employeeId+'/locations';
          hashHistory.push(path);  
        }

        return(
            <div>
                <Tabs initialSelectedIndex={0} value={this.state.path}>
                    <Tab icon={<ActionAccountBox />} onActive={onActiveEmployee} value={0}>
                        {React.cloneElement(this.props.children, {
                            employee: this.props.employee,
                            viewMode: this.state.viewMode,
                            employees: this.props.employees,
                            setCurrentEmployee: this.props.setCurrentEmployee,
                            errorTextRequired: "This field is required",
                            employeeTemp: this.state.employeeTemp,
                            setCurrentEmployeeTemp: this.setCurrentEmployeeTemp,

                        })}
                     </Tab>
                   <Tab icon={<CommunicationLocationOn/>}  onActive={onActiveLocation} value={1}>
                        {React.cloneElement(this.props.children, {
                            viewMode: this.state.viewMode,
                            employees: this.props.employees,
                            editEmployee: this.props.editEmployee,
                            setCurrentEmployee: this.props.setCurrentEmployee,
                            errorTextRequired: "This field is required",
                            employeeTemp: this.state.employeeTemp,
                            setCurrentEmployeeTemp: this.setCurrentEmployeeTemp,

                        })}
                   </Tab>
               </Tabs>
                <div className="foot">
                    { (this.state.viewMode) ? (
                        <div>
                            <RaisedButton
                                label={"Edit"}
                                secondary={true}
                                onTouchTap={this.handleEditMode.bind(this)}
                                className="foot-btn"
                            />
                            <RaisedButton
                                label={"Delete"}
                                secondary={true}
                                onTouchTap={this.handleOpenDeleteDialog.bind(this)}
                                className="foot-btn"
                            />

                        </div> ):(
                        <div>
                            <RaisedButton
                                label={"Save"}
                                secondary={true}
                                onTouchTap={this.handleUpdateEmployee.bind(this)}
                                className="foot-btn"
                            />
                            <RaisedButton
                                label={"Cancel"}
                                onTouchTap={this.handleCancel.bind(this)}
                                className="foot-btn"
                            />
                        </div> )}
                </div>
                <Dialog
                   title="Delete Employee"
                   open={this.state.deleteDialogIsOpen}
                   actions={actionsDeleteBtn}
                   onRequestClose={this.handleCloseDeleteDialog.bind(this)}
                   >
                   <div>
                       <span>Are you sure want to delete this employee?</span>
                   </div>
                </Dialog>
                <Dialog
                   open={this.state.validationDialogIsOpen}
                   actions={actionsValidationBtn}
                   onRequestClose={this.handleCloseValidationDialog.bind(this)}
                   >
                   <div>
                       <span>Make sure all required fields all filled!</span>
                   </div>
                </Dialog>
            </div>
        );
    }
}

export default EmployeeTab;