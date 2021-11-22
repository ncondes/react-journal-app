import Swal from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';


export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        try {
            const docRef = await addDoc( collection( db, `${uid}/journal/notes`), {
                title: '',
                body: '',
                date: new Date().getTime(),
            });
            dispatch( activeNote( docRef.id, {
                title: '',
                body: '',
                date: new Date().getTime(),
            }))
            dispatch( addNewNote( docRef.id, {
                title: '',
                body: '',
                date: new Date().getTime(),
            }))
        } catch (error) {
            console.log('Error adding document: ', error );
        }
    }
}


export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    }
});


export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note,
    }
})


export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    } 
}


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes,
});


export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !note.url ) {
            delete note.url
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        const noteRef = doc( db, `${ uid }/journal/notes/${ note.id }`)

        await updateDoc( noteRef, noteToFirestore )
        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success')
    }
}


export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})
 

export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;
        Swal.fire({
            title: 'Uploading',
            text: 'Please wait.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) )
        Swal.close();
    }
}


export const startDeleting = ( id ) => {

    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                await deleteDoc( doc( db, `${ uid }/journal/notes/${ id }` ) )
                dispatch( deleteNote( id ) );
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
}


export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id,
})


export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
})