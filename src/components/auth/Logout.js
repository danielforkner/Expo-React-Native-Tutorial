import React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../firebase';

const Logout = () => {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <View>
      <Button
        title={'Logout'}
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};

export default Logout;
