import React, {Component} from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import update from 'react-addons-update';


import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import LookupData from '../data/LookupData';

class DetailHistory extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

  

    render() {

    	const style = {width: '100%', color: 'black', height: '1px', backgroundColor: 'purple'};

        return(
            <div className="content-container">
                <h2 className="content-header">History</h2>
				  <Grid>
					<Row className="show-grid">
						<Col sm={3} md={3} className="location-time">
							<div className="location-month"> November - February </div>
							<div className="location-year"> 2016-PRESENT </div>
     						<hr style={style} />
							<div className="location-month"> Exo Project </div>
							<div className="location-month"> Java Developer </div>
						</Col>
						<Col sm={4} md={4} >
							<select>
							  <option value="volvo">Volvo</option>
							  <option value="saab">Saab</option>
							  <option value="mercedes">Mercedes</option>
							  <option value="audi">Audi</option>
							</select>
							<div> Address </div>
						</Col>
						<Col sm={4} md={2} >
						</Col>
					</Row>
				  </Grid>
            </div>
        );
    }
}

export default DetailHistory;