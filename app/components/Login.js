import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionLock from 'material-ui/svg-icons/action/lock';

import Constants from '../data/Constants';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
        <div>
            <MuiThemeProvider muiTheme={getMuiTheme(Constants.themeIndigo500)}>
                <div>
                    <h2>Login</h2>
                    <ActionAccountCircle/>
                    <TextField hintText="Username"/>
                    <ActionLock/>
                    <TextField hintText="Password"/>
                    <Checkbox /><span>Remember Me</span>
                    <RaisedButton label="Login" secondary={true} />
                </div>
            </MuiThemeProvider>
        </div>
    );
  }
}

export default Login;