import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";

export default function Results({ route }) {
  // console.log(cvResults.name)
  const { cvResults } = route.params;
  console.log(cvResults.uri)
  return (
    <SafeAreaView>
      <Text>In Results</Text>
      <Image source={{ uri: cvResults.url }} style={{ width: 300, height: 300 }} />
      <Text>{cvResults.name}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
