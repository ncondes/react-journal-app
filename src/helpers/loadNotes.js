import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase/firebase-config';


export const loadNotes = async ( uid ) => {

    const notesSnapshot = await getDocs( collection( db, `${ uid }/journal/notes`), );
    const notes = [];
    notesSnapshot.forEach( (doc) => {
        notes.push({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            date: doc.data().date,
            url: doc.data().url || null, 
        })
    })
    return notes;
}


