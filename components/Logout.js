import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Logout(props) {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      AsyncStorage.clear();
      const storage = await AsyncStorage.setItem(
        "auth",
        JSON.stringify({ token: "", id: "" })
      );
      navigation.navigate(props.component);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout} style={props.buttonContainer}>
        <Text style={props.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
