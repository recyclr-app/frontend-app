import React, { useState, useEffect, useRef } from "react";
import { colors } from "../globalstyles";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera, CameraType, FlashMode } from "expo-camera";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCV } from "./api/cvAPI";

export default function CameraPhoto() {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  //set front camera vs back camera
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
  const [cvResults, setCvResults] = useState();
  const [localData, setLocalData] = useState({ token: "", id: "" });

  // async storage for auth
  useEffect(() => {
    const getLocalData = async () => {
      try {
        const fetchStorage = await AsyncStorage.getItem("auth");
        if (fetchStorage) {
          setLocalData(JSON.parse(fetchStorage));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLocalData();
  }, []);
  //send data from userphoto to backend
  const createHistory = async (cvData) => {
    axios.post(
      "https://relievedmint.herokuapp.com/history",
      {
        owner: localData.id,
        label: cvData.item,
        image: cvData.url,
        recyclable: cvData.recyclable,
      },
      {
        headers: {
          Authorization: `Bearer ${localData.token}`,
        },
      }
    );
  };

  //get camera permissions from user
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const permissionResult = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(permissionResult.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    setLoading(true);
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();

        //resizing image before sending to cv api
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

        //CV API
        await getCV(formData, setCvResults, localData, createHistory);

        setCameraImage(data.uri);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const saveImage = async () => {
    if (cameraImage) {
      try {
        const savedPicture = await MediaLibrary.createAssetAsync(cameraImage);
        setCameraImage(null);
        setLoading(false);
        navigation.navigate("Results", { cvResults: cvResults });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRetake = () => {
    setLoading(false);
    setCameraImage(null);
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFlashOn = () => {
    setFlash(FlashMode.on);
  };
  const handleFlashOff = () => {
    setFlash(FlashMode.off);
  };

  return (
    <View style={styles.container}>
      {!cameraImage ? (
        <Camera
          style={styles.camera}
          cameraType={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 50,
              paddingLeft: 30,
            }}
          >
            <TouchableOpacity>
              {flash === FlashMode.off ? (
                <Ionicons
                  name="flash-off-outline"
                  size={30}
                  color="black"
                  onPress={handleFlashOn}
                />
              ) : (
                <Ionicons
                  name="flash-outline"
                  size={30}
                  color="black"
                  onPress={handleFlashOff}
                />
              )}
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: cameraImage }} style={styles.camera} />
      )}
      <View>
        {cameraImage ? (
          <View>
            <View style={styles.options}>
              <TouchableOpacity style={styles.retake} onPress={handleRetake}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Retake Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.showResults} onPress={saveImage}>
                <Text style={{ fontSize: 16 }}>Show Results</Text>
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
            {!loading ? (
              <Ionicons
                name="camera-outline"
                size={50}
                style={{ alignSelf: "center", padding: 2 }}
              />
            ) : (
              <ActivityIndicator
                size="large"
                color={colors.green2}
                style={{ alignSelf: "center", paddingLeft: 2 }}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 50,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  options: {
    width: "100%",
    margin: 20,
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  showResults: {
    backgroundColor: colors.green2,
    padding: 10,
    borderRadius: 20,
  },
  retake: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
  },
});
