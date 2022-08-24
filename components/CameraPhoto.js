import React, { useState, useEffect, useRef } from 'react'

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button
} from 'react-native';

import * as MediaLibrary from 'expo-media-library'
import * as ImageManipulator from 'expo-image-manipulator'
import { Camera, CameraType } from 'expo-camera'
import axios from 'axios';


export default function CameraPhoto() {

  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraImage, setCameraImage] = useState(null);
  //set front camera vs back camera
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)
  
  const [results, setResults] = useState()
  
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const permissionResult = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(permissionResult.status === 'granted')
    })();
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);

        let resizedImage = await ImageManipulator.manipulateAsync(
          data.uri,
          [
            { resize: {
                width: 400,
              } },
          ]
        
        )
        
        const formData = new FormData();
  
        formData.append("file-to-upload", {
          uri: resizedImage.uri,
          path: resizedImage.uri,
          type: 'image',
          name: resizedImage.uri
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
          console.log(results)
        } catch (err) {
          console.log("err" + err);
        }
        
        setCameraImage(data.uri)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const saveImage = async () => {
    if (cameraImage) {
      try {
        const savedPicture = await MediaLibrary.createAssetAsync(cameraImage);
        alert('Picture saved')
        setCameraImage(null);
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (hasCameraPermission === false) {
  return <Text>No access to camera</Text>
}

  
  return (
    <View style={styles.container}>
      {!cameraImage ?
        <Camera
          style={styles.camera}
          cameraType={cameraType}
          flashMode={flash}
          ref={cameraRef}
        >

        </Camera>
        :
          <Image source={{ uri: cameraImage }} style={styles.camera} />
    }
      <View>
        {cameraImage ?
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Button title={'Retake Picture'} onPress={() => setCameraImage(null)} />
            <Button title={'Save Picture'} onPress={saveImage} />
            </View>
        </View>
        :
        <Button  title={'Take a picture'} icon='camera' onPress={takePicture} />
      }
        </View>
    </View>
  );
}

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
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  }
});

