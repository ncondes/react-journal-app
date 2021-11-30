import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Pruebas en authReducer.js', () => {

    const initialState = {
        uid: '12345asdfg',
        name: 'Roberto',
    }

    test('Login', () => {

        const action = {
            type: types.login,
            payload: {
                uid: 'QWERTYUIOP',
                displayName: 'Bonbon',
            }
        }
        const test = authReducer( initialState, action );

        expect( test ).toEqual({
            uid: 'QWERTYUIOP',
            name: 'Bonbon',
        })

    });
    
    test('Logout', () => {

        const action = {
            type: types.logout,
        }
        const test = authReducer( initialState, action );

        expect( test ).toEqual({})

    });
    test('Default', () => {

        const test = authReducer( initialState, {} );

        expect( test ).toEqual( initialState )

    });
})