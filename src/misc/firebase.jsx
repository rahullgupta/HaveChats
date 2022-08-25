import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCxIirDyaVscWDf51nHTt61yqu_c_z5yso',
  authDomain: 'chat-web-app-3c4fa.firebaseapp.com',
  projectId: 'chat-web-app-3c4fa',
  storageBucket: 'chat-web-app-3c4fa.appspot.com',
  messagingSenderId: '852745850370',
  appId: '1:852745850370:web:df739322d15cc17a8f211b',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
