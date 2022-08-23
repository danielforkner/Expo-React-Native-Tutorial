import React, { useState } from 'react';
import { Button, Image, Modal, Text, Pressable, View } from 'react-native';
import styles from '../../styles';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../../firebase';

const UploadProfilePic = ({ setModalVisible, modalVisible }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

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
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.flexRow}>
              <Text>Upload a Profile Pic</Text>
              <Button
                title="X"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <Button
              title="Select Image"
              onPress={async () => {
                await PickImage();
              }}
            />
            {image ? (
              <View style={styles.centeredView}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100 }}
                />
                <Button title="clear image" onPress={() => setImage(null)} />
                <Button
                  title="upload image"
                  onPress={async () => {
                    try {
                      setLoading(true);
                      console.log('UPLOADING');
                      const photoURL = await uploadImageAsync(image);
                      console.log(photoURL);
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setLoading(false);
                      setImage(null);
                      setModalVisible(false);
                    }
                  }}
                />
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View>
          <Text>LOADING...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default UploadProfilePic;
