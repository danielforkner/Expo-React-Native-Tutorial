import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from '../../firebase';

const RegisterLogin = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setIsError(false);
  }, []);

  // React States
  const resetStates = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };

  // Firebase Auth
  const submitForm = async () => {
    setIsError(false);
    if (isRegistering) {
      await submitRegister();
    } else {
      await submitLogin();
    }
  };
  const submitRegister = async () => {
    try {
      await registerWithEmailAndPassword(userName, email, password);
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    } finally {
      resetStates();
    }
  };
  const submitLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    } finally {
      resetStates();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Login or Register</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={'Register'}
          onPress={() => {
            setIsRegistering(true);
          }}
        />
        <Button
          style={styles.button}
          title={'Login'}
          onPress={() => setIsRegistering(false)}
        />
      </View>
      <View style={styles.form}>
        {isRegistering ? (
          <TextInput
            placeholder="username"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={styles.input}
          />
        ) : null}
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button title={'Submit'} onPress={submitForm} />
      </View>
      {isError ? <Text>{errMessage.message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    // border: '1px solid black',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: '.5rem',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 25,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginVertical: '.5rem',
  },
  input: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
});

export default RegisterLogin;
