import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { registerWithEmailAndPassword } from '../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setIsError(false);
  }, []);

  const updatePassword = (text) => {
    setPassword(text);
  };
  const updateEmail = (text) => {
    setEmail(text);
  };
  const updateUserName = (text) => {
    setUserName(text);
  };
  const submitRegister = async () => {
    setIsError(false);
    try {
      await registerWithEmailAndPassword(userName, email, password);
    } catch (error) {
      setIsError(true);
      setErrMessage(error);
    } finally {
      setEmail('');
      setPassword('');
      setUserName('');
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
      {isError ? <Text>{errMessage.message}</Text> : null}
    </View>
  );
};

export default Register;
