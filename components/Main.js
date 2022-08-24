import { AutoFocus } from "expo-camera";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import blob from "../assets/blob-background.png";
import mainLogo from "../assets/icons/recycle2.png";
import camera from "../assets/icons/camera.png";
import imageGallery from "../assets/icons/image-gallery.png";
import { colors } from "../globalstyles";

export default function Main() {
  return (
    <View style={styles.main_container}>
      <Image style={styles.blob_background} source={blob} />
      <Image style={styles.logo} source={mainLogo} />
      <Text style={styles.main_title}>recyclr</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  logo: {
    height: 250,
    position: "relative",
    resizeMode: "stretch",
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
  },
});
