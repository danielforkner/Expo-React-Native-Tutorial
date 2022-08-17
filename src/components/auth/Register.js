import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from '../../firebase';
import { setIsLoggedIn } from './authSlice';

const Register = () => {
  const dispatch = useDispatch();
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
  const submitRegister = async () => {
    setIsError(false);
    try {
      registerWithEmailAndPassword(userName, email, password);
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    } finally {
      resetStates();
    }
  };
  const submitLogin = async () => {
    setIsError(false);
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
    <View>
      <TextInput
        placeholder="username"
        value={userName}
        onChangeText={updateUserName}
      />
      <TextInput placeholder="email" value={email} onChangeText={updateEmail} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={updatePassword}
      />
      <Button title={'Register'} onPress={submitRegister} />
      <Button title={'Login'} onPress={submitLogin} />
      {isError ? <Text>{errMessage.message}</Text> : null}
    </View>
  );
};

export default Register;
