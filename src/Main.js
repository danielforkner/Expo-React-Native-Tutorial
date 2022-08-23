import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AllEvents from './components/events/AllEvents';
import Profile from './components/profile/Profile';

export default function Main() {
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
