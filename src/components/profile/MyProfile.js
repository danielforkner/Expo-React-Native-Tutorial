import React, { useState, useEffect } from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { auth, uploadImageAsync } from '../../firebase';
import Logout from '../auth/Logout';
import RegisterLogin from '../auth/RegisterLogin';
import * as ImagePicker from 'expo-image-picker';
import Constant from 'expo-constants';

const MyProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState(auth.currentUser);

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

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      {isLoggedIn ? (
        <SafeAreaView>
          <Logout />
          <Text>EMAIL: {user?.email}</Text>
          <Text>DISPLAY NAME: {user?.displayName}</Text>
          <Button
            title="Open Picker for Single File"
            onPress={async () => {
              await PickImage();
            }}
          />
          {image ? (
            <View>
              <Image
                source={{ uri: image }}
                style={{ width: 90, height: 90, resizeMode: 'contain' }}
              />
              <Button
                title="upload image"
                onPress={async () => {
                  const photoURL = await uploadImageAsync(image);
                  console.log('THIS IS THE DOWNLAOD URL: ', photoURL);
                }}
              />
            </View>
          ) : null}
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
