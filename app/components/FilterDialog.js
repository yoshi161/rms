import React, {Component} from 'react';
import update from 'react-addons-update';
import SearchInput, {createFilter} from 'react-search-input';

import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import MapsLayers from 'material-ui/svg-icons/maps/layers';

import LookupData from '../data/LookupData';

class FilterDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            active: false,
            lookupGrade: LookupData.grade,
            lookupOffice: LookupData.office,
            grade: LookupData.gradeConfig,
            office: LookupData.officeConfig,
        }
    }

    // working
    handleGenerateGrade(){
        var lookupGrade = this.state.lookupGrade
        var gradeGenerate = this.createObject(lookupGrade);
        console.log(gradeGenerate);
    }

    // working
    createObject(object){
        var keys  = Object.keys(object).map( o => object[o].code)
        var obj  = {};
        for (let key of keys){
            obj[key] = false;
        }
        return obj;
    }

    handleToggle() {
        this.setState({
            active: !(this.state.active),
        });
    };

    handleChangeAllGradeValue(event, checked) {
        var grade = this.state.grade;
        Object.keys(grade).forEach(function (key) {
          grade[key] = event.target.checked;
        });
        this.setState({
            grade: grade
        });
    }

    handleChangeGradeValue(event, checked, type) {
        var nextState = update(this.state, {
             grade: {[type]: {$set: event.target.checked}}
        });
        this.setState({
            grade: nextState.grade
        });
    }

    handleChangeAllOfficeValue(event, checked) {
        var office = this.state.office;
        Object.keys(office).forEach(function (key) {
          office[key] = event.target.checked;
        });
        this.setState({
            office: office
        });
    }

    handleChangeOfficeValue(event, checked, type) {
        var nextState = update(this.state, {
             office: {[type]: {$set: event.target.checked}}
        });
        this.setState({
            office: nextState.office
        });
    }

    handleFilterOption(){
    	// working
    	var employees   = this.props.employees;
    	var active      = this.state.active;

        var grade = this.state.grade
        var office = this.state.office
        var allGrade = true;
        var allOffice = true;
        Object.keys(grade).forEach(function(key){
            allGrade = allGrade && grade[key]
        });
        Object.keys(office).forEach(function(key){
            allOffice = allOffice && office[key]
        });

        if (active) employees = this.filterByStatus(employees);
        if (!allGrade)  employees = this.filterByGrade(employees);
        if (!allOffice) employees = this.filterByOffice(employees);

        var filterByCriteria = !(allGrade && allOffice);
        var filterMode = active || filterByCriteria;
        this.props.handleSetFilterEmployee(employees, filterMode, filterByCriteria);
        if (employees.length){
            this.props.setCurrentEmployee(employees[0]);
        }
        this.handleCloseFilterDialog();
    }

    filterByStatus(employees){
        var toDelete = new Set([false]);
        var filterEmployee= employees.filter(employee => !toDelete.has(employee.active));
        //console.log(filterEmployee);
        return filterEmployee;
    }

    filterByGrade(employees){
        var grade = this.state.grade;
        var unCheckedGrade = Object.keys(grade).filter( g => {if (grade[g] == false) return g;});
        var toDelete = new Set(unCheckedGrade);
        var filterEmployee= employees.filter(employee => !toDelete.has(employee.grade));
        //console.log(filterEmployee);
        return filterEmployee;
    }

    filterByOffice(employees){
        var office = this.state.office;
        var unCheckedOffice = Object.keys(office).filter( o => {if (office[o] == false) return o;});
        var toDelete = new Set(unCheckedOffice);
        var filterEmployee= employees.filter(employee => !toDelete.has(employee.office));
        //console.log(filterEmployee);
        return filterEmployee;
    }


    handleCloseFilterDialog() {
        this.props.handleCloseFilterDialog();
    }

    render() {

        const actionsFilterBtn = [
            <RaisedButton
                label="Ok"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleFilterOption.bind(this)}
            />
        ];

        var lookupGrade = this.state.lookupGrade.map ( grade =>
            <ListItem
                key={grade.code}
                primaryText={grade.desc}
                leftCheckbox={
                    <Checkbox
                        checked={this.state.grade[grade.code]}
                        onClick={(event, checked) => this.handleChangeGradeValue(event, checked, grade.code)}
                    />}
                />
        );

        var lookupOffice = this.state.lookupOffice.map ( office =>
            <ListItem
                key={office.code}
                primaryText={office.desc}
                leftCheckbox={
                    <Checkbox
                        checked={this.state.office[office.code]}
                        onClick={(event, checked) => this.handleChangeOfficeValue(event, checked, office.code)}
                    />}
                />
        );

        var grade = this.state.grade
        var office = this.state.office
        var allGrade = true;
        var allOffice = true;
        Object.keys(grade).forEach(function(key){
            allGrade = allGrade && grade[key]
        });
        Object.keys(office).forEach(function(key){
            allOffice = allOffice && office[key]
        });

        return(
            <Dialog
                title="Filter Option"
                open={this.props.filterDialogIsOpen}
                actions={actionsFilterBtn}
                onRequestClose={this.handleCloseFilterDialog.bind(this)}
                contentStyle={{minWidth: "320px", maxWidth: "450px"}}
                autoScrollBodyContent={true}
                >
                    <List className="content-container">
                        <ListItem
                            primaryText={this.state.active?"Only Active Employee":"All Employee"}
                            rightToggle={<Toggle
                                    toggled={this.state.active}
                                    onToggle={this.handleToggle.bind(this)}
                                />}
                            />
                        <ListItem
                            primaryText="Grade"
                            leftCheckbox={
                                <Checkbox
                                    checked={allGrade}
                                    onClick={(event, checked) => this.handleChangeAllGradeValue(event, checked)}
                                />}
                            initiallyOpen={!allGrade}
                            nestedItems={lookupGrade}
                        />
                        <ListItem
                            primaryText="Office"
                            leftCheckbox={
                                <Checkbox
                                    checked={allOffice}
                                    onClick={(event, checked) => this.handleChangeAllOfficeValue(event, checked)}
                                />}
                            initiallyOpen={!allOffice}
                            nestedItems={lookupOffice}
                        />
                    </List>
            </Dialog>
        );
    }
}

export default FilterDialog;