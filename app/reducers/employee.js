import * as Immutable from 'seamless-immutable'

const initialState = Immutable.asMutable({
  employee: {}
});

function employee (state=initialState, action) {
	if (typeof action.id !== 'undefined') {
	switch(action.type) {
		case 'EDIT_EMPLOYEE_DATA':
			return Immutable.asMutable(editEmployee(state, action));
		default:
			return state;

	}
	}
	return state;
}


function editEmployee(state = initialState, action) {
	states = action.employee;
	return state;
}

export default employee
