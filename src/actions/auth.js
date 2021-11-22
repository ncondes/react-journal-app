import { types } from '../types/types';
import { getAuth, signInWithPopup, FacebookAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

const auth = getAuth();

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        dispatch( startLoading() )

        signInWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {

                dispatch(
                    login( user.uid, user.displayName )
                )

                dispatch( finishLoading() )

            })
            .catch( error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
                dispatch( finishLoading() )
            })
    }
}

export const startRegisterWithEmailPasswordName = ( name, email, password ) => {

    return ( dispatch ) => {

        createUserWithEmailAndPassword( auth, email, password )
            .then( async ({ user }) => {
                await updateProfile( auth.currentUser, {
                    displayName: name,
                })
                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch ( error => {
                console.log( error );
            }) 
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        signInWithPopup( auth, googleAuthProvider )
            .then( (result) => {
                const user = result.user
                dispatch(
                    login( user.uid, user.displayName )
                )
            })

    }
}

export const startFacebookLogin = () => {
    return ( dispatch ) => {
        const provider = new FacebookAuthProvider();
        signInWithPopup( auth, provider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            })
    }
}

export const login = ( uid, displayName ) => ({
        type: types.login,
        payload: {
            uid,
            displayName,
        },
})

export const startLogout = () => {
    return async ( dispatch ) => {
        await signOut( auth )
            .then( () => {
                dispatch( logout() )
                dispatch( noteLogout() )
            })
            .catch( error => {
                console.log( error );
            })
    }
} 

export const logout = () => ({
    type: types.logout
})