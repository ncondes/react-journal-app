import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import Swal from 'sweetalert2';


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    // import useSelector from react-redux this to select one of the states of the redux
    // const { errorMessage } = useSelector( state => state.ui ); 

    const [ formValues, handleInputChange ] = useForm({
        name: 'Fernanda',
        email: 'Fernanda@gmail.com',
        password: '123456',
        confirmPassword: '123456',
    })

    const {
        name,
        email,
        password,
        confirmPassword
    } = formValues;

    const handleRegister = ( e ) => {
        e.preventDefault();
        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName( name, email, password ) )
        }
    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            Swal.fire({
                title: 'Error!',
                text: 'Full Name is required',
                icon: 'error',
                confirmButtonText: 'OK',
            })
            dispatch( setError( 'Full Name is required' ) )
            return false
        } else if ( !validator.isEmail( email ) ) {
            Swal.fire({
                title: 'Error!',
                text: 'Email is not valid',
                icon: 'error',
                confirmButtonText: 'OK',
            })
            dispatch( setError( 'Email is not valid' ) )
            return false
        } else if ( password !== confirmPassword || password.length < 5 ) {
            Swal.fire({
                title: 'Error!',
                text: 'Password should be at least 6 cahracters and match each other',
                icon: 'error',
                confirmButtonText: 'OK',
            })
            dispatch( setError( 'Password should be at least 6 cahracters and match each other' ) )
            return false
        }

        dispatch( removeError() )
        return true;
    }

    return (
        <>
            <h2 className='auth__title animate__animated animate__fadeIn animate__fast'>Sign Up</h2>
            <form
                className='auth__form animate__animated animate__fadeIn animate__fast'
                onSubmit={ handleRegister }
            >

                <label className='auth__label'>
                    Full Name
                    <div className='auth__input-container'>
                        <img
                            src='../assets/icons/user-icon.png'
                            alt='mail icon'
                        />
                        <input
                            type='text'
                            placeholder='Enter your Full Name'
                            name='name'
                            autoComplete='off'
                            value={ name }
                            onChange={ handleInputChange }
                        />
                    </div>
                </label>
                <label className='auth__label'>
                    Email
                    <div className='auth__input-container'>
                        <img
                            src='../assets/icons/mail-icon.png'
                            alt='mail icon'
                        />
                        <input
                            type='email'
                            placeholder='Enter your Email'
                            name='email'
                            autoComplete='off'
                            value={ email }
                            onChange={ handleInputChange }
                        />
                    </div>
                </label>
                <label className='auth__label'>
                    Password
                    <div className='auth__input-container'>
                        <img
                            src='../assets/icons/key-icon.png'
                            alt='key icon'
                        />
                        <input
                            type='password'
                            placeholder='************'
                            name='password'
                            value={ password }
                            onChange={ handleInputChange }
                        />
                    </div>
                </label>
                <label className='auth__label'>
                    Confirm Password
                    <div className='auth__input-container'>
                        <img
                            src='../assets/icons/key-icon.png'
                            alt='key icon'
                        />
                        <input
                            type='password'
                            placeholder='************'
                            name='confirmPassword'
                            value={ confirmPassword }
                            onChange={ handleInputChange }
                        />
                    </div>
                </label>
                <button
                    type='submit'
                    className='btn btn-white btn-block mt-5 mb-5'
                >
                    Register
                </button>

                <p className='auth__bottom'>
                    Have an account?
                    <Link to='/auth/login'> Login</Link>
                </p>

            </form>
        </>
    )
}
