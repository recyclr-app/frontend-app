import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import Main from "./components/Main";
import { SafeAreaView } from "react-native";
import { colors } from "./globalstyles";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from "./components/nav/Tabs";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: `${colors.green1}`,
    alignItems: "center",
    justifyContent: "center",
  },
});
