
function fetching() {
  return fetch('/api/emfloyees', {
  	  method: 'get'
	});
}

function updating(content) {
  //delete content.id;
  var copy = Object.assign({}, content);
  delete copy.id;
  const theBody = JSON.stringify(copy);
  return fetch('/api/emfloyees', {
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
  	  method: 'post',
	  body: theBody
	});
}

function adding(content) {
  content.userName = content.id;
  var copy = Object.assign({}, content);
  delete copy.id;
  return fetch('/api/emfloyees', {
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
  	  method: 'put',
	  body: JSON.stringify(copy)
	});
}

function deleting(id) {
  return fetch('/api/emfloyees', {
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
  	  method: 'delete',
	  body: id
	});
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

export function editEmployee(id, employee) {
	return {
		type: 'EDIT_EMPLOYEE',
		id,
		employee
	}
}

export function deleteEmployee(id) {
	return {
		type: 'DELETE_EMPLOYEE',
		id
	}
}

export function loadEmployeesAsync(callback) {
	return (dispatch) => {
		return fetching().then(
				emp => {
					emp.json().then( data => {
						const parsed = mapper(data);
						dispatch(loadEmployees(parsed));
						if (callback) callback(parsed);
					})
				},
				() => dispatch(console.log('error occured'))
			);
	}

}

export function updateEmployeeAsync(id, employee) {
	return (dispatch) => {
		return updating(employee).then(
				() => {
					dispatch(editEmployee(id, employee));
				},
				() => dispatch(console.log('error occured'))
			);
	}
}

export function addEmployeeAsync(id, employee) {
	return (dispatch) => {
		return adding(employee).then(
				() => {
					dispatch(addEmployee(id, employee));
				},
				() => dispatch(console.log('error occured'))
			);
	}
}

export function deleteEmployeeAsync(id) {
	return (dispatch) => {
		return deleting(id).then(
				() => {
					dispatch(deleteEmployee(id));
				},
				() => dispatch(console.log('error occured'))
			);
	}
}

function mapper(data) {
	data.forEach(v => {
		v.id = v.userName;
		v.gradeHistory = [];
		v.dependents = [];
	})
	return data;
}