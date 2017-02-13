import employees from '../reducers/employees'

describe('employee reducer', () => {
	it('should create an action to add a new employee', () => {
		expect(
			employees([], {
				id: 'test',
				type: 'ADD_EMPLOYEE',
				employee: {
			        id: 'kholishul_a',
			        firstName: 'Kholishul',
			        lastName: 'Aziz',
			        gender: 'M'
				}
			})
			).toEqual([{
			        id: 'kholishul_a',
			        firstName: 'Kholishul',
			        lastName: 'Aziz',
			        gender: 'M'
			}])


	});
});

describe('employee reducer', () => {
	it('should create an action to add a new employee', () => {
		let state = [{
				        id: 'kholishul_a',
				        firstName: 'Kholishul',
				        lastName: 'Aziz',
				        gender: 'M'
					}];
			
		expect(
			employees(state, {
				id: 'kholishul_a',
				type: 'EDIT_EMPLOYEE',
				employee: {
			        id: 'kholishul_a',
			        firstName: 'K',
			        lastName: 'Z',
			        gender: 'M'
				}
			})
			).toEqual([{
			        id: 'kholishul_a',
			        firstName: 'K',
			        lastName: 'Z',
			        gender: 'M'
			}])


	});
});