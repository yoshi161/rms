export function addEmployee(id, employee) {
	return {
		type: 'ADD_EMPLOYEE',
		id,
		employee
	}
}

export function editEmployee(id, employee) {
	return {
		type: 'EDIT_EMPLOYEE',
		id,
		employee
	}
}