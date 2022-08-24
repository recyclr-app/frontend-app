import { colors } from "../globalstyles";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import blob from "../assets/blob-background.png";
import mainLogo from "../assets/icons/recycle2.png";
import React from "react";

export default function Main() {
  return (
    <View style={styles.main_container}>
      <ImageBackground style={styles.blob_background} source={blob} />
      <View style={styles.mainLogo_container}>
        <Image style={styles.logo} source={mainLogo} />
        <Text style={styles.main_title}>recyclr</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  logo: {
    height: 250,
    position: "relative",
    resizeMode: "stretch",
    width: 250,
  },
  main_title: {
    fontSize: 70,
    fontWeight: "bold",
  },
});
