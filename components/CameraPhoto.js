import React, { useState, useEffect, useRef } from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
  SafeAreaView
} from "react-native";

import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera, CameraType} from "expo-camera";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function CameraPhoto() {

  const navigation = useNavigation()
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  //set front camera vs back camera
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [cvResults, setCvResults] = useState();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const permissionResult = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(permissionResult.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);

        let resizedImage = await ImageManipulator.manipulateAsync(data.uri, [
          {
            resize: {
              width: 400,
            },
          },
        ]);

        const formData = new FormData();

        formData.append("file-to-upload", {
          uri: resizedImage.uri,
          path: resizedImage.uri,
          type: "image",
          name: resizedImage.uri,
        });

        try {
          const response = await axios.post(
            "https://relievedmint.herokuapp.com/cv",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          setCvResults(response.data);
        } catch (err) {
          console.log("err" + err);
        }
        setCameraImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (cameraImage) {
      try {
        const savedPicture = await MediaLibrary.createAssetAsync(cameraImage);
        setCameraImage(null);
        navigation.navigate('Results', { cvResults: cvResults })
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!cameraImage ? (
        <Camera
          style={styles.camera}
          cameraType={cameraType}
          flashMode={flash}
          ref={cameraRef}
        ></Camera>
      ) : (
        <Image source={{ uri: cameraImage }} style={styles.camera} />
      )}
      <View>
        {cameraImage ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: 'black',
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setCameraImage(null)}
              ><Text style={{ color: 'white', fontSize: 20 }}>Retake Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveImage}>
                <Text style={{ color: 'white', fontSize: 20 }}>Use Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            title={"Take a picture"}
            icon="camera"
              onPress={takePicture}
              style={styles.button}
            >
              <Image source={require('../assets/icons/camera.png')}
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10
                }} />
          </TouchableOpacity>
        )}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingBottom: 10,
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
