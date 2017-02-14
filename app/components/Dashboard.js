import React, {Component} from 'react';

import AppBar from 'material-ui/AppBar';
import {white} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import EmployeesData from '../data/EmployeesData'
import Constants from '../data/Constants';
import EmployeeDialog from './EmployeeDialog'
import EmployeeList from './EmployeeList'
import EmployeeTab from './EmployeeTab'

import LookupData from '../data/LookupData';

import {hashHistory} from 'react-router';

class Dashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            employees: null,
            employee: null,
            current: null,
            lookupGrade: LookupData.grade,
            emp: this.props.params.userName
        }

        this.filterEmployee = this.filterEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        console.log(new Date())
        console.log("-- Init State --");
        console.log(this.state);
    }

    setEmployees(employees) {
      /*  this.setState({
            employees: employees
        }) */
        this.props.editEmployee()
    }

    editEmployee(id, employee) {
      /*  this.setState({
            employees: employees
        }) */
        this.props.editEmployee(id, employee);
    }

    setCurrentEmployee(currentEmployee) {
        this.setState({
            employee: currentEmployee
        })
    }

    componentWillMount() {
        this.props.addEmployee(10,{
                id: 'kholishul_as',
                firstName: 'Kholishul I',
                lastName: 'Aziz I',
                gender: 'M',
                dob: new Date(1991,3,1),
                nationality: 'Indonesia',
                maritalStatus: 'M',
                phone: '+62857 3032 3302',
                subDivision: 'Java Bootcamp',
                status: 'P',
                suspendDate: new Object,
                hireDate: new Date(2013,10,18),
                grade: 'SE2',
                division: 'CDC',
                email: 'kholishul.aziz@mitrais.com',
                office: 'JOG',
                active: true,
                dependents: [
                    {name: "Aziz's Wife", dob: new Date(1991,3,1), gender: 'F', type: 'W', active: true},
                    {name: "Aziz's Jr", dob: new Date(2017,3,1), gender: 'M', type: 'C', active: true},
                ],
                gradeHistory:[
                    {startDate: new Date(1991,3,1), endDate: new Date(1991,3,3), grade: 'SE1', devStage: 1},
                    {startDate: new Date(1991,3,2), endDate: new Date(1991,4,3), grade: 'SE2', devStage: 4},
                ]
            })
        this.props.loadEmployeesAsync();

        this.filterEmployee (this.props.employees);
    }


    filterEmployee (employees) {
        if (this.state.emp) {
            const employee = employees.find(e =>  e.id === this.state.emp);

            this.state.employee = employee ? employee : hashHistory.push('404');

        } else {
            this.state.employee = employees[0];
        }
    }

    componentWillReceiveProps(nextProps){
       this.state.emp = nextProps.params.userName;
       this.filterEmployee (nextProps.employees);
    }


    render() {

        console.log("revisited dashboard");
        var grade = this.state.lookupGrade.filter(grade => (grade.code == this.state.employee.grade));

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo500)}>
                    <AppBar>
                        <div className="app-bar-user-img">
                            <IconButton iconStyle={Constants.mediumIcon}>
                                <ActionAccountCircle color={white}/>
                            </IconButton>
                        </div>
                        <div className="app-bar-user-info">
                            <span>
                                {this.state.employee.firstName} {this.state.employee.lastName}<br />
                                <small>{grade[0].desc}</small>
                            </span>
                        </div>
                        <IconButton tooltip="Setting" iconStyle={Constants.mediumIcon}>
                            <ActionSettings color={white} />
                        </IconButton>
                        <IconButton tooltip="Logout" iconStyle={Constants.mediumIcon}>
                            <ActionPowerSettingsNew color={white} />
                        </IconButton>
                    </AppBar>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo400)}>
                    <div className="panel-container">
                        <div className="panel-list">
                            <EmployeeList
                                employees={this.props.employees}
                                setCurrentEmployee={this.setCurrentEmployee.bind(this)}
                            />
                        </div>
                        <div className="panel-tab">
                                {React.cloneElement(this.props.children, {
                                    employees: this.props.employees,
                                    employee: this.state.employee,
                                    editEmployee: this.editEmployee,
                                    setCurrentEmployee: this.setCurrentEmployee.bind(this)})}
                        </div>
                        <div>
                            <EmployeeDialog
                                addEmployee={this.props.addEmployee}
                                employees={this.props.employees}
                                employee={this.props.employee}
                                setEmployees={this.setEmployees.bind(this)}
                                setCurrentEmployee={this.setCurrentEmployee.bind(this)}
                            />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Dashboard;