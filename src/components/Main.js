import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Register from './auth/Register';
import Logout from './auth/Logout';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn } from './auth/authSlice';

export default function Main() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
      } else {
        dispatch(setIsLoggedIn(false));
      }
    });
  }, []);

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
