import firebase from 'firebase/app';

const config = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: 'chat-web-app-3c4fa.firebaseapp.com',
  projectId: 'chat-web-app-3c4fa',
  storageBucket: 'chat-web-app-3c4fa.appspot.com',
  messagingSenderId: '852745850370',
  appId: '1:852745850370:web:df739322d15cc17a8f211b',
};

const app = firebase.initializeApp(config);
