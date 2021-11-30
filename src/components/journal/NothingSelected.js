import { useContext } from 'react';
import { SidebarContext } from './JournalScreen';


export const NothingSelected = () => {

    const { sidebarIsOpen, setSidebarIsOpen } = useContext( SidebarContext );

    const handleMenu = () => {
        setSidebarIsOpen( !sidebarIsOpen )
    }

    return (
        <div className="nothing__main-content">
            <div
                className='nothing__mobile-menu'
                onClick={ handleMenu }
            >
                <img src='../assets/icons/menu-icon.png' alt='mobile menu icon'/>
            </div>
            <p>
                Select something
                <br />
                Or create a new entry
            </p>
            <img
                src='../assets/icons/notes-icon.png'
                alt='notes icon'
            />

            <i className="far fa-star fa-4x mt-5"></i>
        </div>
    )
}
