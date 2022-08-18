import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getEventsByUserDocId } from '../../firebase';
import AddEvents from './AddEvent';

const MyEvents = ({ docid }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const myEvents = await getEventsByUserDocId(docid);
      console.log(myEvents);
      setEvents(myEvents);
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
