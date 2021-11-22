import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { useSelector } from 'react-redux';


export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes )

    return (
        <div className="journal__grid animate__animated animate__fadeIn animate__fast">
            <Sidebar />
            <main>
                {
                    ( active )
                        ? ( <NoteScreen /> )
                        : ( <NothingSelected /> )
                }
            </main>
        </div>
    )
}
