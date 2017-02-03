import React, {Component} from 'react';
import update from 'react-addons-update';

import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Constants from '../data/Constants';

class SortingDialogCriteria extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleChangeSelectValue(event, index, value, type, indexCriteria) {
        var nextState;
        nextState = update(this.props, {
             sorting: {
                [type]: {$set: value}
             }
        });
        this.props.updateSortingCriteria(indexCriteria, nextState);
    }

    render() {
        return(
            <div id={"sort-criteria-"+this.props.indexCriteria} className="content-min">
                <IconButton className="content-x"
                    iconStyle={Constants.smallIcon}
                    onTouchTap={this.props.removeSortingCriteria.bind(this, this.props.indexCriteria)}
                    disabled={this.props.disabledRemove}>
                    <NavigationClose />
                </IconButton>
                <SelectField
                    value = {this.props.sorting.sortingBy}
                    hintText="Sort By"
                    style={{width: "150px"}}
                    className="content-min"
                    onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'sortingBy', this.props.indexCriteria)}
                    >
                    <MenuItem value={"firstName"} primaryText="Name" />
                    <MenuItem value={"office"} primaryText="Office" />
                    <MenuItem value={"grade"} primaryText="Grade" />
                    <MenuItem value={"hireDate"} primaryText="Join Date" />
                </SelectField>
                <SelectField
                    value = {this.props.sorting.sortingType}
                    hintText="Sort Type"
                    style={{width: "150px"}}
                    className="content-min"
                    onChange={(event, index, value) =>  this.handleChangeSelectValue(event, index, value, 'sortingType', this.props.indexCriteria)}
                    >
                    <MenuItem value={"asc:"} primaryText="Ascending" />
                    <MenuItem value={"desc:"} primaryText="Descending" />
                </SelectField>
            </div>
        );
    }
}

export default SortingDialogCriteria;