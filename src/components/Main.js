import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Register from './auth/Register';
import Logout from './auth/Logout';
import { auth, getUserByUid } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn, setUser } from './auth/authSlice';

export default function Main() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        dispatch(setIsLoggedIn(true));
      }
    });

    const getUser = async () => {
      let user = await getUserByUid(uid);
      dispatch(setUser({ uid: user.uid, name: user.name, email: user.email }));
    };

    if (uid) {
      getUser();
    }
  }, [uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Login or Register</Text>
      {isLoggedIn ? <Logout /> : <Register />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
