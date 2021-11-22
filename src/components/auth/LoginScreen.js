import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';


export const LoginScreen = () => {


    const dispatch = useDispatch();
    const { ui } = useSelector(state => state)

    const [ formValues, handleInputChange ] = useForm({
        email: 'Fernanda@gmail.com',
        password: '123456'
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>
        	<h2 className='auth__title animate__animated animate__fadeIn animate__fast'>Login</h2>
            <form
                className='auth__form animate__animated animate__fadeIn animate__fast'
                onSubmit={ handleLogin }
            >
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
                <button
                    type='submit'
                    className='btn btn-white btn-block mt-5 mb-5'
                    disabled={ ui.loading }
                >
                    Login
                </button>
                <div className='auth__social'>
                    <p>- or -</p>
                    <p>Login with social</p>
                    <div className='auth__social-links'>
                        <div className='btn-white btn-circle'>
                            <img
                                src='../assets/icons/facebook-icon.png'
                                alt='facebook icon'
                            />
                        </div>
                        <div
                            className='btn-white btn-circle'
                            onClick={ handleGoogleLogin }
                        >
                            <img
                                src='../assets/icons/google-icon.png'
                                alt='google icon'
                            />
                        </div>
                    </div>
                </div>
                <p className='auth__bottom'>
                    Don't have and account?
                    <Link to='/auth/register'> Sign up</Link>
                </p>

            </form>
        </>
    )
}
