import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { SidebarContext } from './JournalScreen';

export const JournalEntry = ({ id, title, body, date, url }) => {

    const dispatch = useDispatch();

    const noteDate = moment( date );

    const { sidebarIsOpen, setSidebarIsOpen } = useContext( SidebarContext ); 

    const handleEntryClick = () => {
        setSidebarIsOpen( !sidebarIsOpen )
        dispatch( activeNote( id, {
            date, title, body, url
        }))
    }

    return (
        <div
            className='journal__entry pointer animate__animated animate__fadeInLeft animate__fast'
            onClick={ handleEntryClick }
        >
            

            {
                url
                    ?   (
                            <div 
                                className="journal__entry-picture"
                                style={{
                                    backgroundSize: 'cover',
                                    backgroundImage: `url(${ url })`,
                                }}
                            ></div>
                        )
                    :   (
                            <div 
                                className="journal__entry-picture"
                                style={{
                                    backgroundSize: 'cover',
                                    backgroundImage: `url('../assets/images/default-note.jpg')`,
                                }}
                            ></div>
                        )
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('D') }</h4>
            </div>

        </div>
    )
}
