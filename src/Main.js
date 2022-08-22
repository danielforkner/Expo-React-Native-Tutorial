import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn } from './components/auth/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AllEvents from './components/events/AllEvents';
import Profile from './components/profile/Profile';
import Test from './components/profile/Test';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('USER FOUND');
        dispatch(setIsLoggedIn(true));
      } else {
        console.log('NO USER');
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
        inactiveColor="#3e2465"
        // labeled={false}
        barStyle={{ backgroundColor: '#694fad' }}
      >
        {/* <Screen
          name="Test"
          component={Test}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="stop" color={'red'} size={26} />
            ),
          }}
        /> */}
        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account-box" size={26} />
            ),
          }}
        />
        <Screen
          name="events"
          component={AllEvents}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="calendar" size={26} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
