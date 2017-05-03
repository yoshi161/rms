import React, {Component} from 'react';
import update from 'react-addons-update';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import DetailGrade from './DetailGrade'
import DetailFamily from './DetailFamily'
import DetailHistory from './DetailHistory'
import DetailEmployee from './DetailEmployee'
import DetailLocation from './DetailLocation'
import DetailDependent from './DetailDependent'

class EmployeeDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            createDialogIsOpen: false,
            stepIndex: 0,
            errorTextRequired: '',
            employee: this.emptyEmployee()
        }

        this.emptyEmployee = this.emptyEmployee.bind(this);
        this.setNewEmployee = this.setNewEmployee.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.setCurrentEmployeeTemp = this.setCurrentEmployeeTemp.bind(this);
    }

    setCurrentEmployeeTemp(currentEmployee) {
        this.setState({
            employee: _.cloneDeep(currentEmployee) 
        });
    }

    setNewEmployee(newEmployee) {
        this.setState({
            employee: newEmployee
        })
    }

    handleOpenDialog() {
        this.setState({
            createDialogIsOpen: true,
        });
    }

    handleCloseDialog() {
        this.setState({
            createDialogIsOpen: false,
            stepIndex: 0,
            errorTextRequired: '',
            employee: this.emptyEmployee()
        });
    }

    emptyEmployee() {
      return {
        
                 id: '',
                 firstName: '',
                 lastName: '',
                 gender: '',
                 dob: new Object,
                 nationality: '',
                 maritalStatus: '',
                 phone: '',
                 subDivision: '',
                 status: '',
                 suspendDate: new Object,
                 hireDate: new Object,
                 grade: '',
                 division: '',
                 email: '',
                 office: '',
                 active: true,
                 dependents: [],
                 gradeHistory:[
                     {startDate: new Object, endDate: new Object, grade: '', devStage: 0},
                 ],
                 locations: [],
                 histories: [],
                 families: [],
                 grades: []

            }
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <DetailEmployee
                        employeeTemp={this.state.employee}
                        viewMode={false}
                        errorTextRequired={this.state.errorTextRequired}
                        setCurrentEmployeeTemp = {this.setCurrentEmployeeTemp}
                    />
                ); 
            case 1:
                return (
                    <DetailFamily
                        employee={this.state.employee}
                        viewMode={false}
                        fromAddEmployee={true}
                        employeeTemp={this.state.employee}
                        errorTextRequired={this.state.errorTextRequired}
                        setCurrentEmployee={this.setNewEmployee.bind(this)}
                        setCurrentEmployeeTemp = {this.setCurrentEmployeeTemp}
                    />);
            case 2:
                return (
                    <DetailGrade
                        employee={this.state.employee}
                        viewMode={false}
                        fromAddEmployee={true}
                        employeeTemp={this.state.employee}
                        errorTextRequired={this.state.errorTextRequired}
                        setCurrentEmployee={this.setNewEmployee.bind(this)}
                        setCurrentEmployeeTemp = {this.setCurrentEmployeeTemp}
                    />
                );
            case 3:
                return (
                    <DetailHistory
                        employee={this.state.employee}
                        viewMode={false}
                        fromAddEmployee={true}
                        employeeTemp={this.state.employee}
                        errorTextRequired={this.state.errorTextRequired}
                        setCurrentEmployee={this.setNewEmployee.bind(this)}
                        setCurrentEmployeeTemp = {this.setCurrentEmployeeTemp}
                    />
                );
            case 4:
                return (
                    <DetailLocation
                        employee={this.state.employee}
                        viewMode={false}
                        fromAddEmployee={true}
                        employeeTemp={this.state.employee}
                        errorTextRequired={this.state.errorTextRequired}
                        setCurrentEmployee={this.setNewEmployee.bind(this)}
                        setCurrentEmployeeTemp = {this.setCurrentEmployeeTemp}
                    />
                );
            default:
                return
        }
    }

    handleAddNewEmployee(){
        let generatedId = this.state.employee.firstName+" "+this.state.employee.lastName;
        generatedId = generatedId.replace(/ /g, '_');
        var newEmployee = update(this.state, {
             employee: {id: {$set: generatedId}}
        });
        var employeesData = this.props.employees
        this.props.addEmployee(newEmployee.employee.id, newEmployee.employee);
        this.handleCloseDialog();
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleNext() {
        const {stepIndex} = this.state;
        var errorTextRequired = false;
        switch (stepIndex) {
            case 0:
                if (this.state.employee.firstName=="" || this.state.employee.lastName=="" || this.state.employee.gender==""
                        /*|| this.state.employee.dob=="" ||*/ || this.state.employee.phone=="" || this.state.employee.subDivision==""
                        || this.state.employee.grade=="" || this.state.employee.division=="" || this.state.employee.email==""
                        ){
                    errorTextRequired = true;
                }
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }

        if ( errorTextRequired == true){
            this.setState({
                errorTextRequired: 'This field is required!',
            });
        } else {
            this.setState({
                stepIndex: stepIndex + 1,
                errorTextRequired: '',
            });
            if (stepIndex==5){
                this.handleAddNewEmployee();
            }
        }
    };


    render() {
        const {stepIndex} = this.state;
        const asd = "asd";
        const title = [
            <Stepper key="Stepper" linear={true} activeStep={stepIndex}>
              <Step>
                <StepLabel>Detail</StepLabel>
              </Step>
              <Step>
                <StepLabel>Family</StepLabel>
              </Step>
              <Step>
                <StepLabel>History</StepLabel>
              </Step>
              <Step>
                <StepLabel>Grade</StepLabel>
              </Step>
              <Step>
                <StepLabel>Location</StepLabel>
              </Step>
            </Stepper>
        ];
        const actionsBtn = [
            <RaisedButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev.bind(this)}
            />,
            <RaisedButton
                label={stepIndex === 5 ? 'Create Employee' : 'Next'}
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleNext.bind(this)}
            />
        ];

        return(
            <div>
                <div className="panel-list-add">
                    <FloatingActionButton secondary={true} onTouchTap={this.handleOpenDialog.bind(this)}>
                      <ContentAdd />
                    </FloatingActionButton>
                </div>
                <Dialog
                    open={this.state.createDialogIsOpen}
                    title={title}
                    actions={actionsBtn}
                    contentStyle={{width: "65%", maxWidth: "none", height:"65%", maxHeight:"none"}}
                    autoScrollBodyContent={true}
                    onRequestClose={this.handleCloseDialog.bind(this)}>
                    <div className="content-dialog">
                        {this.getStepContent(stepIndex)}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default EmployeeDialog;