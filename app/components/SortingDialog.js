import React, {Component} from 'react';
import sortBy from 'array-sort-by';

import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SortingDialogCriteria from './SortingDialogCriteria'

const sortingData = [
    {
       sortingBy: "firstName",
       sortingType: "asc:",
    }
];

class SortingDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            sortings: sortingData,
            sorting: sortingData[0],
        }
    }

    addSortingCriteria(){
        var sortingData = this.state.sortings
        sortingData.push({
            sortingBy: "firstName",
            sortingType: "asc:",
        })
        //console.log("-- Add New Sorting Criteria --");
        this.setState({ sortings: sortingData });
    }

    updateSortingCriteria(indexCriteria, nextState) {
        var sortingData = this.state.sortings;
        sortingData[indexCriteria] = nextState.sorting;
        //console.log("-- Update sorting["+indexCriteria+"] --");
        this.setState({
            sortings: sortingData,
            sorting: nextState
        });
    }

    removeSortingCriteria(indexCriteria){
        var sortingData = this.state.sortings;
        if (sortingData.length>1){
            sortingData.splice( indexCriteria, 1 );
            this.setState({
                sortings: sortingData,
            });
        }
    }

    handleSortingOption(){
        var employees = this.props.employees;
        var sortingData = this.state.sortings;
        sortingData.reverse();
        sortingData.map( (sorting, index) =>  {
            //console.log("-- Sorting["+index+"-"+sorting.sortingBy+"-"+sorting.sortingType+"] --");
            sortBy(employees, (e) => [sorting.sortingType] + [e[sorting.sortingBy]]);
        });
        sortingData.reverse();
        this.props.setCurrentEmployee(employees[0]);
        this.handleCloseSortingDialog();
    }

    handleCloseSortingDialog() {
        this.props.handleCloseSortingDialog();
    }

    render() {
        var sortingDialogCriteria = this.state.sortings.map ( (sorting,index) =>
            <SortingDialogCriteria
                key={index} indexCriteria={index}
                disabledRemove={this.state.sortings.length<2 ? true:false}
                updateSortingCriteria={this.updateSortingCriteria.bind(this)}
                removeSortingCriteria={this.removeSortingCriteria.bind(this)}
                sorting={sorting} />
        )

        const actionsSortingBtn = [
            <RaisedButton
                label="Ok"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSortingOption.bind(this)}
            />
        ];

        return(
            <Dialog
                title="Sorting Option"
                open={this.props.sortingDialogIsOpen}
                actions={actionsSortingBtn}
                onRequestClose={this.handleCloseSortingDialog.bind(this)}
                contentStyle={{minWidth: "320px", maxWidth: "450px"}}
                >
                <div className="content-min-container">
                    <div>
                        <div className="content-min">
                            <span>Sort By</span>
                        </div>
                        <div className="content-min">
                            <span>Sort type</span>
                        </div>
                    </div>
                    {sortingDialogCriteria}
                    <div>
                        <FloatingActionButton
                            className="sort-criteria-add"
                            onTouchTap={this.addSortingCriteria.bind(this)}
                            secondary={true} mini={true}
                            disabled={this.state.sortings.length>2 ? true:false}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default SortingDialog;