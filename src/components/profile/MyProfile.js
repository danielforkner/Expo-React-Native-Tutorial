import React, { useState } from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import Logout from '../auth/Logout';
import RegisterLogin from '../auth/RegisterLogin';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const MyProfile = ({ navigation }) => {
  const [picked, setPicked] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState(auth.currentUser);

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
              try {
                const pickedResult = await DocumentPicker.pick({
                  allowMultiSelection: true,
                  type: [types.doc, types.docx],
                });
              } catch (error) {
                console.error(error);
              }
            }}
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
