import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Register from './src/components/Register';
import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from './src/firebase';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Login or Register</Text>
      <Register />
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
