import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/nav/Tabs";
import { Text, View } from "react-native";


export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
      <StatusBar style='dark'/>
    </NavigationContainer>
  );
}
