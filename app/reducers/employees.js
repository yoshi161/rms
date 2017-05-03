import * as Immutable from 'seamless-immutable'

const initialState = Immutable.asMutable({
  employees: []
});


function addEmployee (state = initialState, action) {
	const employee = action.employee ? action.employee : null
	switch(action.type) {
		case 'ADD_EMPLOYEE':
			return employee;
		case 'EDIT_EMPLOYEE':
			return employee;
		default:
			return state;

	}
	return state;
} 

function employees (state=initialState, action) {
	if (typeof action.id !== 'undefined') {
	switch(action.type) {
		case 'ADD_EMPLOYEE':
			return Immutable.asMutable([...state, action.employee ? action.employee : null]);
		case 'EDIT_EMPLOYEE':
			return Immutable.asMutable(editEmployee(state, action));
		case 'LOAD_EMPLOYEES':
			return Immutable.asMutable([...action.employees]);
		case 'DELETE_EMPLOYEE':
			let index = state.findIndex((x) => x.id === action.id); 
			  return Immutable.asMutable([
			    ...state.slice(0, index),
			    ...state.slice(index + 1)
			    ]);
		default:
			return state;

	}
	}
	return state;
}


function editEmployee(state = initialState, action) {
	if (typeof action.id !== 'undefined') {
		const index = state.findIndex(s => s.id === action.id)
		if (index !== -1) {
			const states = [...state]
			states[index] = action.employee ? action.employee : null;
			return states;
		} else {
			return state;
		}
	}

	return state;
}

export default employees
