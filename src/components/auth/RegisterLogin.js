import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from '../../firebase';

const RegisterLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
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
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button title={'Login'} onPress={() => setIsRegistering(false)} />
        <Button
          title={'Register'}
          onPress={() => {
            setIsRegistering(true);
          }}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
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
