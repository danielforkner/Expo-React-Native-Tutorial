import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'fir-tutorial-ce628.firebaseapp.com',
  projectId: 'fir-tutorial-ce628',
  storageBucket: 'fir-tutorial-ce628.appspot.com',
  messagingSenderId: '243675237549',
  appId: '1:243675237549:web:56eb2d7fc8dacda9d48a24',
  measurementId: 'G-2FE8ETMK04',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
