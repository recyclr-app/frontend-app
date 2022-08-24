import React, { useState} from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator'
import axios from 'axios'

const Upload = () => {


    //upload from camera roll
  const [selectedImage, setSelectedImage] = useState(null);
  const [results, setResults] = useState()

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    let resizedImage = await ImageManipulator.manipulateAsync(
      pickerResult.uri,
      [
        { resize: {
            width: 400,
          }},
      ]
    
    )

    const formData = new FormData();
  
    formData.append("file-to-upload", {
      uri: resizedImage.uri,
      path: resizedImage.uri,
      type: pickerResult.type,
      name: pickerResult.fileName
    });

    try {
      const response = await axios.post(
        'https://relievedmint.herokuapp.com/cv',
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResults(response.data)
    } catch (err) {
      console.log("err" + err);
    }

    setSelectedImage({ localUri: resizedImage.uri });
  };

  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't avaible on your platform`);
      return;
    }

    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
    await Sharing.shareAsync(imageTmp.uri);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Text>{results.name}</Text>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text styles={styles.btnText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

    return (
    <View style={styles.container}>
        <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the button below!</Text>

        <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.button}
        >
            <Text style={styles.btnText}>Pick a photo</Text>
        </TouchableOpacity>
    </View>
    );
};

export default Upload;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
    },
    logo: {
      width: 305,
      height: 159,
      marginBottom: 10,
    },
    instructions: {
      color: '#888',
      fontSize: 18,
      marginHorizontal: 15,
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    btnText: {
      fontSize: 20,
    },
    thumbnail: {
      width: 400,
      height: 600,
      resizeMode: 'contain'
    },
    camera: {
      flex: 1,
      borderRadius: 20,
    }
  });
  