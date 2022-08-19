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
  doc,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

// TODO
// * refactor query logic into simple function

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
    return user;
  } catch (err) {
    throw err;
  }
};

// ----------------USERS
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // const user = userCredential.user;
    // await addDoc(collection(db, 'users'), {
    //   uid: user.uid,
    //   name,
    //   authProvider: 'local',
    //   email,
    // });

    // let docid;
    // const usersRef = collection(db, 'users');
    // const q = query(usersRef, where('uid', '==', user.uid));
    // const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   docid = doc.id;
    // });
    // const userUpdateRef = doc(db, 'users', docid);
    // const forceSync = await updateDoc(userUpdateRef, {
    //   docid: docid,
    // });
    // return docid;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const logout = async () => {
  await signOut(auth);
};

const getUserByUid = async (uid) => {
  let user;
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach((doc, i) => {
    user = doc.data();
  });
  return user;
};

// ----------------EVENTS
export const getEventsByUserDocId = async (docid) => {
  const events = [];
  const eventsRef = collection(db, 'events');
  const q = query(eventsRef, where('author', '==', docid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    events.push(doc.data());
  });
  return events;
};

export const addEventByAuthor = async (eventData, docid) => {
  try {
    const { title, description } = eventData;
    await addDoc(collection(db, 'events'), {
      title,
      description,
      author: docid,
    });

    let eventid;
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('author', '==', docid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (event) => {
      eventid = event.id;
      const eventsUpdateRef = doc(db, 'events', eventid);
      await updateDoc(eventsUpdateRef, {
        eventid: eventid,
      });
    });
  } catch (error) {
    console.error(err);
    throw err;
  }
};

export const deleteEventByAuthor = async (eventid) => {
  try {
    await deleteDoc(doc(db, 'events', eventid));
  } catch (error) {
    console.error(error);
    throw err;
  }
};

export {
  app,
  auth,
  db,
  getUserByUid,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
};
