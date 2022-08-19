import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterLogin from './components/auth/RegisterLogin';
import Logout from './components/auth/Logout';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn } from './components/auth/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllEvents from './components/events/AllEvents';

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

  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Navigator>
        {isLoggedIn ? (
          <Screen name="auth" component={Logout} />
        ) : (
          <Screen name="auth" component={RegisterLogin} />
        )}
        <Screen name="events" component={AllEvents} />
      </Navigator>
    </NavigationContainer>
  );
}
