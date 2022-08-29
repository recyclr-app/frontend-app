import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  const handleLogout = async () => {
    try {
      AsyncStorage.clear();
      const storage = await AsyncStorage.setItem(
        "auth",
        JSON.stringify({ token: "", id: "" })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
