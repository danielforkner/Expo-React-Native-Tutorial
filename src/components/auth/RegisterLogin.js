import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  getUserByUid,
} from '../../firebase';
import { setIsLoggedIn, setStatus } from './authSlice';

const RegisterLogin = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setIsError(false);
  }, []);

  // React States
  const resetStates = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };
  const updatePassword = (text) => {
    setPassword(text);
  };
  const updateEmail = (text) => {
    setEmail(text);
  };
  const updateUserName = (text) => {
    setUserName(text);
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
    dispatch(setStatus('loading'));
    try {
      await registerWithEmailAndPassword(userName, email, password);
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    } finally {
      dispatch(setStatus('idle'));
      resetStates();
    }
  };
  const submitLogin = async () => {
    try {
      const user = await logInWithEmailAndPassword(email, password);
      if (user) {
        dispatch(setIsLoggedIn(true));
      }
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
      {authStatus === 'loading' ? <Text>Loadin...</Text> : null}
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
            onChangeText={updateUserName}
            style={styles.input}
          />
        ) : null}
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={updateEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={updatePassword}
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
