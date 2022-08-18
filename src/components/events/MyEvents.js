import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsByUserDocId } from '../../firebase';
import { setMyEvents } from '../auth/authSlice';
import AddEvents from './AddEvent';

const MyEvents = ({ docid }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.auth.myEvents);

  useEffect(() => {
    const getEvents = async () => {
      const myEvents = await getEventsByUserDocId(docid);
      console.log(myEvents);
      dispatch(setMyEvents(myEvents));
    };
    if (docid) getEvents();
  }, [docid]);

  return (
    <View>
      <Text>MY EVENTS</Text>
      {events.length
        ? events.map((event) => {
            return (
              <Text style={{ border: '1px solid blue' }} key={event.eventid}>
                {event.title}: {event.description}
              </Text>
            );
          })
        : null}
      <AddEvents docid={docid} />
    </View>
  );
};

export default MyEvents;
