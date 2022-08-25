import { Text, View, TouchableOpacity, Linking } from "react-native";
import React, { Component } from "react";

export class RecyclingGuide extends Component {
  render() {
    const uriEpa =
      "https://www.bing.com/search?q=national+recycling+resources&cvid=ca9c4ce0e3c2475f9fef7094bcfa50e7&aqs=edge..69i57j0j69i64.6231j0j4&FORM=ANAB01&PC=U531";
    return (
      <View>
        <TouchableOpacity onPress={() => Linking.openURL(uriEpa)}>
          <Text>EPA</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RecyclingGuide;
