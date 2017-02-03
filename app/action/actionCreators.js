export function addEmployee(id, employee) {
	return {
		type: 'ADD_EMPLOYEE',
		id,
		employee
	}
}