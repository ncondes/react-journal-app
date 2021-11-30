import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';


jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg'
    } )
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING',
    },
    notes: {
        active: {
            id: '4x5jlYqeHf3uzNMi5PTk',
            title: 'Hola',
            body: 'Mundo',
        }
    }
}

let store = mockStore( initState );


describe('Pruebas con las acciones de notes', () => {

    beforeEach( () => {
        store = mockStore( initState )
    })

    test('Debe de crear una nueva nota startNewNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        });

        const docId = actions[0].payload.id;
        const noteRef = doc( db,`TESTING/journal/notes/${ docId }`);
        await deleteDoc( noteRef );

    });

    // test('StartLoadingNotes debe cargar las notas', async() => {

    //     await store.dispatch( startLoadingNotes('TESTING') );
        
    //     const actions = store.getActions();

    //     expect( actions[0] ).toEqual({
    //         type: types.notesLoad,
    //         payload: expect.any(Array)
    //     });



    // })

    test('startSaveNote debe de actualizar la nota', async() => {
        
        const note = {
            id: '4x5jlYqeHf3uzNMi5PTk',
            title: 'title',
            body: 'body',
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

    });

    test('startUploading debe actualizar el url del entry', async() => {
        
        const file = new File( [], 'foto.jpg' );

        await store.dispatch( startUploading( file ) );

    })
})