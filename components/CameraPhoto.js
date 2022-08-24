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
import { Camera, CameraType } from 'expo-camera'

export default function CameraPhoto() {

  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraImage, setCameraImage] = useState(null);
  //set front camera vs back camera
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)
  
  
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
        setCameraImage(data.uri)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const saveImage = async () => {
    if (cameraImage) {
      try {
        await MediaLibrary.createAssetAsync(cameraImage);
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


  /* <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={{ width: 305, height: 159 }} /> */ 
  
  return (
    <View style={styles.container}>
      {!cameraImage ?
        <Camera
          style={styles.camera}
          cameraType={cameraType}
          flashMode={flash}
          ref={cameraRef}
        >

          <Text>hello</Text>

        </Camera>
        :
        <Image source={{ uri: cameraImage }} style={styles.camera} />
    }
      <View>
        {cameraImage ?
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Button title={'Retake Picture'} onPress={() => setCameraImage(null)} />
            <Button title={'Save Picture'} onPress={saveImage} />
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

