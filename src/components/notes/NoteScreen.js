import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useEffect, useRef } from 'react';
import { activeNote, startDeleting } from '../../actions/notes';



export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }

    }, [ note, reset ])

    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues }) );

    }, [ formValues, dispatch ])

    const handleDelete = () => {
        dispatch( startDeleting( id) )
    }

    return (
        <div className="notes__main-content animate__animated animate__fadeIn">
            <NotesAppBar />
            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Your title here"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    name='title'
                    value={ title }
                />

                <textarea
                    placeholder="What happened today ?"
                    className="notes__textarea"
                    onChange={ handleInputChange }
                    name='body'
                    value={ body }
                ></textarea>


                {
                    (note.url)
                        && (
                            <div className="notes__img">
                                <img 
                                    src={ note.url }
                                    alt="uploaded img"
                                />
                            </div>
                        )
                }

            </div>

            <button
                className='btn btn-danger'
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
