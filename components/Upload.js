import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// upload returned data from cv to history db.
// guest/defaultuser id 630992c820fc61d17c3faf20
const createHistory = (cvData) => {
  const userId = "630992c820fc61d17c3faf20";
  axios.post("https://relievedmint.herokuapp.com/history", {
    owner: userId,
    label: cvData.item,
    image: cvData.url,
    recycable: cvData.recycable,
  });
};


const Upload = () => {
  //upload from camera roll
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [cvResults, setCvResults] = useState();

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

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

    try {
      const response = await axios.post(
        "https://relievedmint.herokuapp.com/cv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setCvResults(response.data);
      createHistory(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("err" + err);
    }

    setSelectedImage({ localUri: resizedImage.uri });
  };

  let openShareDialogAsync = async () => {
    if (Platform.OS === "web") {
      alert(`Uh oh, sharing isn't avaible on your platform`);
      return;
    }

    const imageTmp = await ImageManipulator.manipulateAsync(
      selectedImage.localUri
    );
    await Sharing.shareAsync(imageTmp.uri);
  };

  const showResults = () => {
    navigation.navigate("Results", { cvResults: cvResults });
    setSelectedImage(null);
  };

  const openCamera = () => {
    navigation.navigate("OpenCamera");
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
    <View style={styles.container}>
      <Image
        source={require("../assets/icons/recycle2.png")}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
        To check if an item is recycleable, please select a photo
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
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Ionicons name="image-outline" size={30} color="black" />
          <Text style={styles.btnText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    width: 215,
    height: 215,
    position: "relative",
  },
  instructions: {
    color: "#888",
    fontSize: 24,
    margin: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#8ADEB7",
    width: 100,
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
