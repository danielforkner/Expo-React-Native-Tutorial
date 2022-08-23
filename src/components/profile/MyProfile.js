import React, { useState, useEffect } from 'react';
import { Button, View, Text, SafeAreaView, Platform } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Logout from '../auth/Logout';
import RegisterLogin from '../auth/RegisterLogin';
import * as ImagePicker from 'expo-image-picker';
import UploadProfilePic from './UploadProfilePic';

const MyProfile = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const getPermission = async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission denied');
        }
      }
    };
    getPermission();
  }, []);

  return (
    <View>
      <UploadProfilePic
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {user ? (
        <SafeAreaView>
          <Logout />
          <Text>EMAIL: {user?.email}</Text>
          <Text>DISPLAY NAME: {user?.displayName}</Text>
          <Button
            title="upload profile pic"
            onPress={() => setModalVisible(true)}
          />
          <Button
            title={'Go to test'}
            onPress={() => navigation.navigate('Test')}
          />
        </SafeAreaView>
      ) : (
        <RegisterLogin />
      )}
    </View>
  );
};

export default MyProfile;
