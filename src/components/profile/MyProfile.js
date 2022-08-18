import React from 'react';
import { FlatList, Button, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const MyProfile = ({ user: { name, docid, email, uid } }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>
        <FlatList
          data={[
            `Name: ${name}`,
            `docid: ${docid}`,
            `Email: ${email}`,
            `uid: ${uid}`,
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text>{item}</Text>
              <Button title={'edit'} />
            </View>
          )}
        />
      </Text>
    </View>
  );
};

export default MyProfile;
