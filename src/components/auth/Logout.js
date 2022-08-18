import React from 'react';
import { Button, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../firebase';
import { resetState, setIsLoggedIn } from './authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <View>
      <Button
        title={'Logout Please'}
        onPress={() => {
          logout();
          dispatch(resetState());
        }}
      />
      <Text>{`Hello, ${user?.name}`}</Text>
    </View>
  );
};

export default Logout;
