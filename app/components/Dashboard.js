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
            employee: {
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
                 locations: []
            },
            current: null,
            lookupGrade: LookupData.grade,
            emp: this.props.params.userName
        }

        this.filterEmployee = this.filterEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        console.log(new Date())
        console.log("-- Init State --");
        console.log(this.state);
    }

    setEmployees(employees) {
        this.props.editEmployee()
    }

    editEmployee(id, employee) {
        this.props.updateEmployeeAsync(id, employee);
    }

    deleteEmployee(id) {
        this.props.deleteEmployeeAsync(id);
    }


    setCurrentEmployee(currentEmployee) {
        this.setState({
            employee: currentEmployee
        })
    }

    componentDidMount () {

        this.props.loadEmployeesAsync((data) => {
           this.filterEmployee(data); 
        });
    }


    filterEmployee (employees) {
        if (this.state.emp) {
            const employee = employees.find(e =>  e.userName === this.state.emp);

            if (employee) {
               this.setState({employee});
            } else {
                hashHistory.push('404'); 
            }

        } else {
           this.setState({employee: employees[0]});
        }
    }

    componentWillReceiveProps(nextProps) {
       this.state.emp = nextProps.params.userName;
       this.filterEmployee (nextProps.employees);
       return true;
    }


    render() {
        console.log("revisited dashboard");
        var grade = this.state.lookupGrade.filter(grade => (grade.code == this.state.employee.grade));
        if (grade.length == 0)  grade = [{desc:""}];

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
                                    deleteEmployee: this.deleteEmployee,
                                    setCurrentEmployee: this.setCurrentEmployee.bind(this)})}
                        </div>
                        <div>
                            <EmployeeDialog
                                addEmployee={this.props.addEmployeeAsync}
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