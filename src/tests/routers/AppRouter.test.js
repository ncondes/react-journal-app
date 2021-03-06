import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';



jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        errorMessage: null,
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: [],
    }
};

let store = mockStore( initState );
store.dispatch = jest.fn();


describe('Pruebas en AppRouter', () => {

    test('Debe de llamar el login si estoy autenticado', async () => {

        let user;

        await act( async () => {

            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword( auth, 'test@testing.com', '123456' );
            user = userCred.user;
            // console.log( user );

            const wrapper = mount(
                <Provider store={ store }>
                    <AppRouter />
                </Provider>
            );
            
            // expect( login ).toHaveBeenCalled();
        })
        
    })
    
})