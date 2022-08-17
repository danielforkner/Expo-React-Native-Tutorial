import React from 'react';
import { Button, View } from 'react-native';
import { logout } from '../../firebase';

const Logout = () => {
  return (
    <View>
      <Button
        title={'Logout Please'}
        onPress={() => {
          logout();
        }}
        onClick={() => {
          logout();
        }}
      />
    </View>
  );
};

export default Logout;
