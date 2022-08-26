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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  blob_background: {
    flex: 1,
    height: 1100,
    top: -100,
    width: 1100,
  },
  mainLogo_container: {
    top: "-30%",
    width: '100%',
    alignItems: 'center'
  },
  logo: {
    height: 215,
    width: 215,
    position: "relative",
    resizeMode: "stretch",
  },
  main_title: {
    fontSize: 70,
    fontWeight: "bold",
  },
});
