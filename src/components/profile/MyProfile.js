import React, { useState } from 'react';
import { FlatList, Button, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import MyEvents from '../events/MyEvents';

const MyProfile = () => {
  const [user, setUser] = useState(auth.currentUser);

  return (
    <View>
      <Text>{user.email}</Text>
      <Button title={'Update Profile'} />
    </View>
  );
};

export default MyProfile;
