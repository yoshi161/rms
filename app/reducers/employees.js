function addEmployee (state = [], action) {
	console.log(action)
	const employee = action.employee ? action.employee : null
	switch(action.type) {
		case 'ADD_EMPLOYEE':
			return employee;
		default:
			return state;
	}
	return state;
} 

function employees (state = [], action) {
	console.log(action)
	if (typeof action.id !== 'undefined') {
		return [...state, addEmployee(state[action.id], action)];
	}
	return state;
}

export default employees;