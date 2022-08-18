import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsByUserDocId, deleteEventByAuthor } from '../../firebase';
import { setMyEvents } from '../auth/authSlice';
import AddEvents from './AddEvent';


const MyEvents = ({ docid }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.auth.myEvents);
  
  const handleDelete = async (eventid) => {
    await deleteEventByAuthor(eventid);
    const myEvents = await getEventsByUserDocId(docid);
    dispatch(setMyEvents(myEvents));
  }

  useEffect(() => {
    const getEvents = async () => {
      const myEvents = await getEventsByUserDocId(docid);
      dispatch(setMyEvents(myEvents));
    };
    if (docid) getEvents();
  }, [docid]);
  console.log(events)
  return (
    <View>
      <Text>MY EVENTS</Text>
      {events.length
        ? events.map((event) => {
            return (
              <View key={event.eventid}>
                <Text style={{ border: '1px solid blue' }}>
                  {event.title}: {event.description}
                </Text>
                <Button title={"Delete"} onPress={() => handleDelete(event.eventid)}/>
              </View>
            );
          })
        : null}
      <AddEvents docid={docid} />
    </View>
  );
};

export default MyEvents;
