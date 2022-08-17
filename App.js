import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Register from './src/components/Register';
import Logout from './src/components/Logout';
import {
  auth,
  currentUser,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from './src/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  // transfer to Redux store
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log('auth.currentUser: ', auth.currentUser);
      } else {
        setIsLoggedIn(false);
        console.log('auth.currentUser: ', auth.currentUser);
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
