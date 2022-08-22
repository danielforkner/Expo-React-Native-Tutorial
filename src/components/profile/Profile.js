import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useState } from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import Logout from '../auth/Logout';
import RegisterLogin from '../auth/RegisterLogin';
import { NavigationContainer } from '@react-navigation/native';
import Test from './Test';
import MyProfile from './MyProfile';

const Profile = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState(auth.currentUser);

  const { Navigator, Screen } = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Navigator>
        <Screen name="Test" component={Test} />
        <Screen name="MyProfile" component={MyProfile} />
        {/* <View>
          {isLoggedIn ? (
            <SafeAreaView>
              <Logout />
              <Text>EMAIL: {user?.email}</Text>
              <Text>DISPLAY NAME: {user?.displayName}</Text>
              <Button title={'Update Profile'} />
              <Button
                title={'NAVIGATE TO TEST'}
                onPress={() => navigation.navigate('Test')}
              />
            </SafeAreaView>
          ) : (
            <RegisterLogin />
          )}
        </View> */}
      </Navigator>
    </NavigationContainer>
  );
};

export default Profile;
