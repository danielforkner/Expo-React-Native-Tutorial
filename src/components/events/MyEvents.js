import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsByUid, deleteEventByAuthor, auth } from '../../firebase';
import { setMyEvents } from '../events/eventsSlice';
import AddEvents from './AddEvent';

const MyEvents = () => {
  const dispatch = useDispatch();
  const myEvents = useSelector((state) => state.events.myEvents);
  const events = useSelector((state) => state.events.events);

  // const handleDelete = async (eventid) => {
  //   await deleteEventByAuthor(eventid);
  //   const myEvents = await getEventsByUserDocId(docid);
  //   dispatch(setMyEvents(myEvents));
  // };

  useEffect(() => {
    const getMyEvents = async () => {
      const myEvents = await getEventsByUid(auth.currentUser.uid);
      dispatch(setMyEvents(myEvents));
    };
    getMyEvents();
  }, [events]);

  return (
    <View>
      <Text>MY EVENTS</Text>
      {myEvents.length > 0
        ? myEvents.map((event) => {
            return (
              <View>
                <Text style={{ border: '1px solid blue' }}>
                  {event.title}: {event.description}
                </Text>
                <Button
                  title={'Delete'}
                  onPress={() => handleDelete(event.eventid)}
                />
              </View>
            );
          })
        : null}
      <AddEvents />
    </View>
  );
};

export default MyEvents;
