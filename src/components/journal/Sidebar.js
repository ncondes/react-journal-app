import { useDispatch, useSelector } from 'react-redux';
import { JournalEntries } from './JournalEntries'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const { auth } = useSelector( state => state )

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <div className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <div>
                    <img
                        src='../assets/icons/user-white-icon.png'
                        alt='add icon'
                    />
                    <span> { auth.name } </span>
                </div>
                <div
                    className='pointer'
                    onClick={ handleLogout }
                >
                    <img
                        src='../assets/icons/logout-white-icon.png'
                        alt='logout icon'
                    />
                    <button
                        className=''
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div
                className='journal__new-entry pointer'
                onClick={ handleAddNew }
            >
                <img
                    src='../assets/icons/add-white-icon.png'
                    alt='add new entry icon'
                />
                <p>
                    New entry
                </p>
            </div>

            <JournalEntries />

        </div>
    )
}
