import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";

export default function Logout(props) {
  const navigation = useNavigation();
=======

export default function Logout() {
>>>>>>> dedf853 (Luxe steve (#20))
  const handleLogout = async () => {
    try {
      AsyncStorage.clear();
      const storage = await AsyncStorage.setItem(
        "auth",
        JSON.stringify({ token: "", id: "" })
      );
<<<<<<< HEAD
      navigation.navigate(props.component);
=======
>>>>>>> dedf853 (Luxe steve (#20))
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
<<<<<<< HEAD
      <TouchableOpacity onPress={handleLogout} style={props.buttonContainer}>
        <Text style={props.buttonText}>Log out</Text>
=======
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out</Text>
>>>>>>> dedf853 (Luxe steve (#20))
      </TouchableOpacity>
    </View>
  );
}
