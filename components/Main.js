<<<<<<< HEAD
import { colors } from "../globalstyles";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import blob from "../assets/blob-background.png";
import mainLogo from "../assets/icons/recycle2.png";
import React from "react";
=======
import { AutoFocus } from "expo-camera";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import blob from "../assets/blob-background.png";
import mainLogo from "../assets/icons/recycle2.png";
import camera from "../assets/icons/camera.png";
import imageGallery from "../assets/icons/image-gallery.png";
import { colors } from "../globalstyles";
>>>>>>> e455614a5f50a396439e031fbced42b763246dbc

export default function Main() {
  return (
    <View style={styles.main_container}>
<<<<<<< HEAD
      <ImageBackground style={styles.blob_background} source={blob} />
      <View style={styles.mainLogo_container}>
        <Image style={styles.logo} source={mainLogo} />
        <Text style={styles.main_title}>recyclr</Text>
=======
      <Image style={styles.blob_background} source={blob} />
      <Image style={styles.logo} source={mainLogo} />
      <Text style={styles.main_title}>recyclr</Text>
      <View style={styles.lowerIcons_container}>
        <View style={styles.smallIcon_container}>
          <Image style={styles.smallIcon} source={camera} />
        </View>
        <View style={styles.smallIcon_container}>
          <Image style={styles.smallIcon} source={imageGallery} />
        </View>
>>>>>>> e455614a5f50a396439e031fbced42b763246dbc
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  main_container: {
    alignItems: "center",
    background: `url(${blob})`,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  blob_background: {
    flex: 1,
    height: 1200,
    top: -250,
    width: 1400,
  },
  mainLogo_container: {
    top: "-20%",
=======
  main_title: {
    fontSize: 70,
    fontWeight: "bold",
  },
  main_container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  blob_background: {
    width: 1400,
    height: 500,
    top: 75,
    border: 1,
    position: "absolute",
>>>>>>> e455614a5f50a396439e031fbced42b763246dbc
  },
  logo: {
    height: 250,
    position: "relative",
    resizeMode: "stretch",
<<<<<<< HEAD
    width: 250,
  },
  main_title: {
    fontSize: 70,
    fontWeight: "bold",
=======
    top: 50,
    width: 250,
  },
  lowerIcons_container: {
    top: 75,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  smallIcon: {
    height: 50,
    width: 50,
  },
  smallIcon_container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    height: 75,
    padding: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 75,
>>>>>>> e455614a5f50a396439e031fbced42b763246dbc
  },
});
