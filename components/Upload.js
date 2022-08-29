import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../globalstyles";

const Upload = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [cvResults, setCvResults] = useState();
  const [localData, setLocalData] = useState({ token: "", id: "" });
  const [loading, setLoading] = useState(false);

  //async storage for auth
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
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  //opens user image picker
  let openImagePickerAsync = async () => {
    //get user permission to access camera roll
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    //set image to user choice
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    setLoading(true);
    if (pickerResult.cancelled === true) {
      setLoading(false);
      return;
    }
    //reduce photo size before prior to sending to backend
    let resizedImage = await ImageManipulator.manipulateAsync(
      pickerResult.uri,
      [
        {
          resize: {
            width: 400,
          },
        },
      ]
    );

    const formData = new FormData();

    formData.append("file-to-upload", {
      uri: resizedImage.uri,
      path: resizedImage.uri,
      type: pickerResult.type,
      name: pickerResult.fileName,
    });
    //send image data to cv api
    try {
      const response = await axios.post(
        "https://relievedmint.herokuapp.com/cv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setCvResults(response.data);

      //upload to userhistory if logged in
      localData.token !== "" && createHistory(response.data);
    } catch (err) {
      console.log(err);
    }

    setSelectedImage({ localUri: resizedImage.uri });
  };

  const showResults = () => {
    navigation.navigate("Results", { cvResults: cvResults });
    setSelectedImage(null);
    setLoading(false);
  };

  const openCamera = () => {
    navigation.navigate("OpenCamera");
  };

  const handleLogin = () => {
    navigation.navigate("LoginPage");
  };

  if (selectedImage !== null) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      >
        <View style={styles.pickedPhotoContainer}>
          <TouchableOpacity onPress={showResults} style={styles.showResults}>
            <Text styles={styles.btnText}>Show Results</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={{ marginTop: 15 }}
          >
            <Text styles={styles.btnText}>Choose a different photo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/icons/appname.png")}
        style={styles.appName}
      />
      <Text style={styles.statement}>Recycling can be confusing.</Text>
      <Text style={styles.statement}>We're here to help.</Text>

      <View style={styles.lowerContainer}>
        <Image
          source={require("../assets/icons/recycle2.png")}
          style={styles.logo}
        />
        <Text style={styles.instructions}>
          Use your camera to identify if an item is recyclable
        </Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <Ionicons name="camera-outline" size={30} color="black" />
            <Text style={styles.btnText}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.button}
          >
            <Ionicons name="image-outline" size={30} color="black" />
            <Text style={styles.btnText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.green2}
          style={styles.loader}
        />
      ) : null}

      <View style={styles.login}>
        <Text>
          Already have an account?{" "}
          <Text
            onPress={handleLogin}
            style={{ color: colors.green2, textDecorationLine: "underline" }}
          >
            Log in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  appName: {
    resizeMode: "contain",
    width: "50%",
    marginLeft: 10,
  },
  statement: {
    width: "80%",
    marginLeft: 20,
    color: "gray",
  },
  pickedPhotoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "80%",
    width: "90%",
    borderRadius: 30,
    marginBottom: 30,
  },
  logo: {
    width: 190,
    height: 190,
    alignSelf: "center",
  },
  lowerContainer: {
    backgroundColor: colors.blob,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 30,
    marginVertical: 40,
  },
  instructions: {
    color: colors.lightblack,
    fontWeight: "bold",
    fontSize: 20,
    margin: 15,
    paddingTop: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    width: 100,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  login: {
    marginTop: 50,
    alignSelf: "center",
  },
  loader: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 150,
    alignSelf: "center",
  },
  thumbnail: {
    width: "90%",
    height: 500,
    resizeMode: "contain",
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  showResults: {
    backgroundColor: "#8ADEB7",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
