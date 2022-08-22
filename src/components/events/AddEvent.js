import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  addEventByAuthor,
  auth,
  getAllPublicEvents,
  getEventsByUserDocId,
} from '../../firebase';
import { setMyEvents, setEvents } from '../events/eventsSlice';

const AddEvents = () => {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState('');
  const [form, setForm] = useState(false);
  const [eventDescription, setEventDescription] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async () => {
    try {
      await addEventByAuthor({
        title: eventName,
        description: eventDescription,
        state,
        city,
        isPublic,
        authorName: auth.currentUser.displayName,
        author: auth.currentUser.uid,
      });
      const events = await getAllPublicEvents();
      dispatch(setEvents(events));
    } catch (error) {
      console.error(error);
    } finally {
      setEventDescription('');
      setEventName('');
      setState('');
      setCity('');
      setForm(false);
    }
  };

  return (
    <View>
      <Button title={'Add Event'} onPress={() => setForm(!form)} />
      {form ? (
        <View>
          <TextInput
            placeholder="event name"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="event description"
            value={eventDescription}
            onChangeText={(text) => setEventDescription(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="city"
            value={city}
            onChangeText={(text) => setCity(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="state"
            value={state}
            onChangeText={(text) => setState(text)}
            style={styles.input}
          />
          <Button title={'Add Event'} onPress={handleSubmit} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
});

export default AddEvents;
