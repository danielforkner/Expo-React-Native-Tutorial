import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Test from './Test';
import MyProfile from './MyProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Profile = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Profile;
