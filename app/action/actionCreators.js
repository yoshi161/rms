
function fetching() {
  return fetch('/api/employees');
}

export function addEmployee(id, employee) {
	return {
		type: 'ADD_EMPLOYEE',
		id,
		employee
	}
}

export function loadEmployees(employees) {
	return {
		type: 'LOAD_EMPLOYEES',
		id: 'ID',
		employees
	}
}

export function loadEmployeesAsync() {
	return (dispatch) => {
		return fetching().then(
				emp => {
					emp.json().then( data => {
						dispatch(loadEmployees(data))
					})
				},
				() => dispatch(console.log('error occured'))
			);
	}

}

export function editEmployee(id, employee) {
	return {
		type: 'EDIT_EMPLOYEE',
		id,
		employee
	}
}