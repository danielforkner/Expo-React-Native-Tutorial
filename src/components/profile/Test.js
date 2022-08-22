import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';

const Test = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>HELLO FROM TEST</Text>
      <Button
        title={'Go to MyProfile'}
        onPress={() => navigation.navigate('MyProfile')}
      />
    </SafeAreaView>
  );
};

export default Test;
