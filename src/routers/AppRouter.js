import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { ErrorScreen } from '../components/auth/ErrorScreen';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { LoadingScreen } from '../components/loading/LoadingScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState( true );
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {
        
        const auth = getAuth();
        onAuthStateChanged( auth, async ( user ) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) )
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );
            } else {
                setIsLoggedIn( false );
            }
            setChecking( false );
        });

    }, [ dispatch, setChecking, setIsLoggedIn ])


    if ( checking ) {
        return(
            <LoadingScreen />
        )
    }

    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path='auth/*' element={
                        <PublicRoute isLoggedIn={ isLoggedIn }>
                            <AuthRouter />
                        </PublicRoute>
                    }/>

                    <Route path='/' element={
                        <PrivateRoute isLoggedIn={ isLoggedIn }>
                            <JournalScreen />
                        </PrivateRoute>
                    }/>

                    <Route path='/*' element={ <ErrorScreen /> }/>

                </Routes>
            </BrowserRouter>
        </>
    )
}
