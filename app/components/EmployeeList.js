import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input';

import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import {white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AvSortByAlpha from 'material-ui/svg-icons/av/sort-by-alpha';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import AVPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';

import EmployeeListDetail from './EmployeeListDetail'
import SortingDialog from './SortingDialog'
import FilterDialog from './FilterDialog'

const KEYS_TO_FILTERS = ['firstName','lastName'];

class EmployeeList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchMode: false,
            searchQuery: '',
            searchEmployee: {},
            filterMode: false,
            filterByCriteria: false,
            filterEmployee: {},
            sortingDialogIsOpen: false,
            filterDialogIsOpen: false,
        }
    }

    handleChangeSearchQueryValue(event, type) {
        var nextState = {};
        nextState[type] = event.target.value;
        this.setState(nextState);
        this.handleSearchEmployee(event);
    }

    handleSearchEmployee(event){
        var employees = {};
        if (this.state.filterMode) {
            employees = this.state.filterEmployee;
        } else {
            employees = this.props.employees;
        }
        if (event.target.value.length >= 3){
            var searchEmployee = employees.filter(createFilter(event.target.value, KEYS_TO_FILTERS));
            this.setState({
                searchEmployee: searchEmployee,
                searchMode: true,
            });
            //console.log("-- Search --")
            //console.log(searchEmployee);
        } else {
            this.handleUnSearchEmployee(event);
        }
    }

    handleUnSearchEmployee(event){
        if (event.target.value.length < 3){
            this.setState({
                searchMode: false,
            });
        }
    }

    handleResetSearch(){
        this.setState({
            searchMode: false,
            searchQuery: ''
        });
    }

    handleSetFilterEmployee(filterEmployee, filterMode, filterByCriteria){
        //console.log("-- Filter --")
        //console.log(filterEmployee);
        this.setState({
            filterEmployee: filterEmployee,
            filterMode: filterMode,
            filterByCriteria: filterByCriteria,
        });
    }

    handleOpenSortingDialog() {
        this.setState({
            sortingDialogIsOpen: true,
        });
    }

    handleCloseSortingDialog() {
        this.setState({
            sortingDialogIsOpen: false,
        });
    }

    handleOpenFilterDialog() {
        this.setState({
            filterDialogIsOpen: true,
        });
    }

    handleCloseFilterDialog() {
        this.setState({
            filterDialogIsOpen: false,
        });
    }

    render() {
		//debugger
        var employee = {}
        if (this.state.searchMode){
            employee = this.state.searchEmployee;
        } else if (this.state.filterMode){
            employee = this.state.filterEmployee;
        } else {
            employee = this.props.employees;
        }

        var employeeListDetail = employee.map( employee =>
            <EmployeeListDetail
                key={employee.id}
                employee={employee}
                setCurrentEmployee={this.props.setCurrentEmployee.bind(this)}
            />
        );

        return(
            <div>
                <div className="panel-list-header">
                    <IconButton onTouchTap={this.handleResetSearch.bind(this)}>
                        {   this.state.searchMode ? <NavigationClose color={white} /> :
                            <ActionSearch color={white} /> }
                    </IconButton>
                    <TextField
                        value={this.state.searchQuery}
                        hintText="Search"
                        onChange={event => this.handleChangeSearchQueryValue(event, 'searchQuery')}
                        onBlur={this.handleUnSearchEmployee.bind(this)}
                        underlineStyle={{display: 'none'}}
                        style ={{width: '40%'}}
                        inputStyle={{color: white}}
                        hintStyle={{color: white}}/>
                    <span className="panel-list-btn panel-list-length"><b>{employeeListDetail.length}</b></span>
                    <IconButton tooltip={this.state.filterByCriteria? "Filter On":"Filter Off"} className="panel-list-btn"
                        disabled={this.state.searchMode?true:false}
                        onTouchTap={this.handleOpenFilterDialog.bind(this)}>
                        {   this.state.filterByCriteria ? <AVPlaylistAddCheck color={white} /> :
                            <ContentFilterList color={white} /> }
                    </IconButton>
                    <IconButton tooltip="Order" className="panel-list-btn"
                        disabled={this.state.searchMode?true:false}
                        onTouchTap={this.handleOpenSortingDialog.bind(this)}>
                        <AvSortByAlpha color={white} />
                    </IconButton>
                </div>
                <div className="panel-list-container">
                    {employeeListDetail.length > 0 ? (
                        <List>
                            {employeeListDetail}
                        </List>
                    ) : (
                        <div className="no-record">
                            <span>No Record Found</span>
                        </div>
                    )}

                </div>
                <SortingDialog
                    employees = {employee}
                    sortingDialogIsOpen = {this.state.sortingDialogIsOpen}
                    handleCloseSortingDialog = {this.handleCloseSortingDialog.bind(this)}
                    setCurrentEmployee = {this.props.setCurrentEmployee.bind(this)}
                />
                <FilterDialog
                    employees = {this.props.employees}
                    filterDialogIsOpen = {this.state.filterDialogIsOpen}
                    handleCloseFilterDialog = {this.handleCloseFilterDialog.bind(this)}
                    handleSetFilterEmployee = {this.handleSetFilterEmployee.bind(this)}
                    setCurrentEmployee = {this.props.setCurrentEmployee.bind(this)}
                />
            </div>
        );
    }
}

export default EmployeeList;