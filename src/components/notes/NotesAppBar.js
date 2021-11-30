import moment from 'moment';
import { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { startSaveNote, startUploading } from '../../actions/notes';
import { SidebarContext } from '../journal/JournalScreen';


export const NotesAppBar = () => {

    const { active } = useSelector( state => state.notes );

    const noteDate = moment( active.date );

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes )

    const handleSave = () => {
        dispatch( startSaveNote( note ) );
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) )
        }
    }

    const { sidebarIsOpen, setSidebarIsOpen } = useContext( SidebarContext );

    const handleMenu = () => {
        setSidebarIsOpen( !sidebarIsOpen )
    }

    return (
        <div className="notes__appbar">
            <span
                className='notes__date'
            >{ noteDate.format('LL') }</span>

            <input
                id='fileSelector'
                type='file'
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div className='notes__appbar-btns'>
                <div
                    className='notes__appbar-btn pointer'
                    onClick={ handlePictureClick } 
                >
                    <img
                        src='../assets/icons/picture-white-icon.png'
                        alt='file icon'
                    />
                    <button>
                        Picture
                    </button>
                </div>
                <div
                    className='notes__appbar-btn pointer'
                    onClick={ handleSave }
                >
                    <img
                        src='../assets/icons/save-white-icon.png'
                        alt='save icon'
                    />
                    <button>
                        Save
                    </button>
                </div>
            </div>
            <div
                    className='notes__mobile-menu pointer'
                    onClick={ handleMenu }
                >
                    <img src='../assets/icons/menu-white-icon.png' alt='mobile menu white icon'/>
            </div>
        </div>
    )
}
