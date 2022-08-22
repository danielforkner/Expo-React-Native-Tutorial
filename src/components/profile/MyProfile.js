import React, { useState } from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import Logout from '../auth/Logout';
import RegisterLogin from '../auth/RegisterLogin';
import { NavigationContainer } from '@react-navigation/native';

const MyProfile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState(auth.currentUser);

  return (
    <View>
      {isLoggedIn ? (
        <SafeAreaView>
          <Logout />
          <Text>EMAIL: {user?.email}</Text>
          <Text>DISPLAY NAME: {user?.displayName}</Text>
          <Button title={'Update Profile'} />
        </SafeAreaView>
      ) : (
        <RegisterLogin />
      )}
    </View>
  );
};

export default MyProfile;
