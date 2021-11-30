import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../../types/types';


const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        errorMessage: null,
    }
};

let store = mockStore( initState );

describe('Pruebas en RegisterScreen', () => {

    const wrapper = mount(
        <MemoryRouter>
            <Provider store={ store }>
                <RegisterScreen />
            </Provider>
        </MemoryRouter>
    );


    test('Debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    })

    test('Debe de hacer el dispatch de la accion respectiva', () => {
        
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate( 'change', {
            target: {
                value: '',
                name: 'email',
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Full Name is required'
        });

    });
    
    
})