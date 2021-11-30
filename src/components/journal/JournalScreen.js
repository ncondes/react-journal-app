import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';


export const SidebarContext = createContext();

export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );
    const [ sidebarIsOpen, setSidebarIsOpen ] = useState( false );

    return (
        <SidebarContext.Provider value={{
            sidebarIsOpen,
            setSidebarIsOpen,
        }}>
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
        </SidebarContext.Provider>
    )
}
