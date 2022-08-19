import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { getAllPublicEvents } from '../../firebase';
import AddEvents from './AddEvent';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const loadAllEvents = async () => {
      const events = await getAllPublicEvents();
      console.log(events);
      setEvents(events);
    };
    loadAllEvents();
  }, []);

  return (
    <View>
      <Text>All Public Events</Text>
      {events.map((event, i) => {
        return (
          <Text style={{ border: '1px solid blue' }} key={i}>
            {event.title}: {event.description}
          </Text>
        );
      })}
      {isLoggedIn ? <AddEvents setEvents={setEvents} /> : null}
    </View>
  );
};

export default AllEvents;
