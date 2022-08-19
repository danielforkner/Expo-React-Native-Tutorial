import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getAllPublicEvents } from '../../firebase';

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadAllEvents = async () => {
      const events = await getAllPublicEvents();
      setEvents(events);
    };
    loadAllEvents();
  }, []);

  return (
    <View>
      <Text>All Events</Text>
      {events.map((event) => {
        if (!event.eventid) return;
        return (
          <Text key={event.eventid}>
            {event.title}: {event.description}
          </Text>
        );
      })}
    </View>
  );
};

export default AllEvents;
