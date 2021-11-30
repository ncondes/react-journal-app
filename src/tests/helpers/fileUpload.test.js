import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    // copy the values from cloudinary dashboard
    cloud_name: 'dorie0yvz', 
    api_key: '777963373223275', 
    api_secret: '4BY5UUd1hc5tgdLgJqsphHXBM9M',
    secure: true
  });

describe('Pruebas en fileUpload.js', () => {

    test('Debe de cargar un archivo y retornar el url', async () => {
        const resp = await fetch('https://images.pexels.com/photos/9274946/pexels-photo-9274946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
        const blob = await resp.blob();
        const file = new File( [ blob ], 'foto.png' );
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );
        // img id
        const segments = url.split('/');
        const imgId = segments[ segments.length - 1 ].replace( '.jpg', '' )
        // delete img
        cloudinary.v2.api.delete_resources( imgId, {}, () => {});
    });

    test('Debe de retonar un error', async () => {
        const file = new File( [], 'foto.png' );
        const url = await fileUpload( file );
        
        expect( url ).toBe( null );
    })
    
    
})