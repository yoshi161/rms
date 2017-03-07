import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'


const RemoteSubmitButton = ({ dispatch }) =>
  <button
    type="button"
    style={style}
    onClick={() => dispatch(submit('remoteSubmit'))}>Submit</button>

export default connect()(RemoteSubmitButton)