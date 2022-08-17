import React from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../firebase';
import { setIsLoggedIn } from './authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Button
        title={'Logout Please'}
        onPress={() => {
          logout();
          dispatch(setIsLoggedIn(false));
        }}
      />
    </View>
  );
};

export default Logout;
