import { AutoFocus } from "expo-camera"; // Do we need this?
import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { colors } from "../globalstyles"; //Global Colors - may delete later

export default function HomeScreen() {
  return (
    <View style={styles.main_container}>
      <ImageBackground
        style={styles.blob_background}
        source={require("../assets/blob-background.png")}
      />
      <View style={styles.mainLogo_container}>
        <Image
          style={styles.logo}
          source={require("../assets/icons/recycle2.png")}
        />
        <Text style={styles.main_title}>recyclr</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    alignItems: "center",
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
