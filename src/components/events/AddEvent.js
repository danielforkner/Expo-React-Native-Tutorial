import React, { useState } from 'react';
import {
  FlatList,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addEventByAuthor } from '../../firebase';

const AddEvents = ({ docid }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      await addEventByAuthor(
        { title: eventName, description: eventDescription },
        docid
      );
    } catch (error) {
    } finally {
      setEventDescription('');
      setEventName('');
    }
  };

  const updateName = (text) => {
    setEventName(text);
  };
  const updateDescription = (text) => {
    setEventDescription(text);
  };

  return (
    <View>
      <Text>ADD EVENT</Text>
      <TextInput
        placeholder="event name"
        value={eventName}
        onChangeText={updateName}
        style={styles.input}
      />
      <TextInput
        placeholder="event description"
        value={eventDescription}
        onChangeText={updateDescription}
        style={styles.input}
      />
      <Button title={'Add Event'} onPress={handleSubmit} />
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
