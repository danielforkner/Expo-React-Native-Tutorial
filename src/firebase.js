import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAUnQulDJkFMcRKRGKTatppEeh023hBrV4',
  authDomain: 'fir-tutorial-ce628.firebaseapp.com',
  projectId: 'fir-tutorial-ce628',
  storageBucket: 'fir-tutorial-ce628.appspot.com',
  messagingSenderId: '243675237549',
  appId: '1:243675237549:web:56eb2d7fc8dacda9d48a24',
  measurementId: 'G-2FE8ETMK04',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
  } catch (err) {
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const logout = () => {
  signOut(auth);
};

export {
  app,
  auth,
  db,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
};
