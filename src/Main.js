import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterLogin from './components/auth/RegisterLogin';
import Logout from './components/auth/Logout';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn } from './components/auth/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AllEvents from './components/events/AllEvents';
import MyProfile from './components/profile/MyProfile';

export default function Main() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
      } else {
        dispatch(setIsLoggedIn(false));
      }
    });
  }, []);

  const { Navigator, Screen } = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Navigator
        backBehavior="history"
        activeColor="orange"
        inactiveColor="grey"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        {isLoggedIn ? (
          <Screen
            name="auth"
            component={Logout}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="home"
                  color={'orange'}
                  size={26}
                />
              ),
            }}
          />
        ) : (
          <Screen name="auth" component={RegisterLogin} />
        )}
        <Screen name="events" component={AllEvents} />
        {isLoggedIn ? <Screen name="my profile" component={MyProfile} /> : null}
      </Navigator>
    </NavigationContainer>
  );
}
