import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth, getAllPublicEvents } from '../../firebase';
import { setEvents } from './eventsSlice';
import MyEvents from './MyEvents';
import styles from '../../styles';
import { useAuthState } from 'react-firebase-hooks/auth';

const AllEvents = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    const loadAllEvents = async () => {
      const events = await getAllPublicEvents();
      dispatch(setEvents(events));
    };
    loadAllEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>All Public Events</Text>
        {events.map((event, i) => {
          return (
            <Text style={{ border: '1px solid blue' }} key={i}>
              {event.title}: {event.description}
            </Text>
          );
        })}
        {user ? (
          <View>
            <MyEvents />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllEvents;
