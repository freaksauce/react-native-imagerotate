import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import Button from './components/Button'

export default function App() {
  const [ selectedImage, setSelectedImage ] = useState('')

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.cancelled === false) {
      setSelectedImage(pickerResult.uri)
    } else {
      alert('Upload a picture please')
    }
  }

  const rotate = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      selectedImage,
      [
        {
          flip: ImageManipulator.FlipType.Vertical
        }
      ],
      {
        format: ImageManipulator.SaveFormat.PNG
      }
    )
    setSelectedImage(manipResult.uri)
  }

  return (
    <View style={styles.container}>
      {selectedImage === '' ? (
        <Button
          onPress={openImagePickerAsync}
        >
          Upload a picture
        </Button>
      ) : (
        <View
          style={{ alignItems: 'center' }}
        >
          <Image
            source={{ uri: selectedImage }}
            style={styles.image}
          />
          <Button
            onPress={rotate}
          >
            Rotate image
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5d03ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 20
  }
});
