import * as reducer from '../reducer/employees'

describe('employee reducer', () => {
	it('should create an action to add a new employee', () => {
		expect(
			reducer(undefined, {
				id: 'test',
				employee: {
			        id: 'kholishul_a',
			        firstName: 'Kholishul',
			        lastName: 'Aziz',
			        gender: 'M'
				}
			})
			).toEqual([{
				id: 'test',
				employee: {
			        id: 'kholishul_a',
			        firstName: 'Kholishul',
			        lastName: 'Aziz',
			        gender: 'M'
				}
			}])


	});
});