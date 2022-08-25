import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { colors } from "./globalstyles";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/nav/Tabs";



export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
      <StatusBar style='dark'/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
