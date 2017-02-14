function addEmployee (state = [], action) {
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

function employees (state=[], action) {
	if (typeof action.id !== 'undefined') {
	switch(action.type) {
		case 'ADD_EMPLOYEE':
			return [...state, action.employee ? action.employee : null];
		case 'EDIT_EMPLOYEE':
			return editEmployee(state, action);
		case 'LOAD_EMPLOYEES':
			debugger
			return [...action.employees];
		default:
			return state;

	}
	}
	return state;
}


function editEmployee(state = [], action) {
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
