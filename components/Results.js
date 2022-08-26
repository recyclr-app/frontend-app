import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";

export default function Results({ route }) {
  // console.log(cvResults.name)
  const { cvResults } = route.params;
  console.log(cvResults)

  return (
    <SafeAreaView>
      <Image source={{ uri: cvResults.url }} style={{ resize: 'auto', width: '100%', height: '60%' }} />

      <View style={styles.resultsContainer}>
      
      <Text style={styles.item}>This item looks like a {cvResults.item}.</Text>
      
        {cvResults.recyclable === true ? 
        <>
          <Text style={styles.isRecyclable}>This item appears recyclable!</Text>
          <Image source={require('../assets/icons/recycle-bin.png')} style={styles.image} />
        </>
          :
        <>
          <Text>Sorry, this item is not recycleable</Text>
          <Image source={require('../assets/icons/trash-bin.png')} style={styles.image} />
        </>
        }

      <Text style={styles.rulesText}>Always check local regulations and labels, where applicable, before disposing of an item.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  isRecyclable: {
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10
  },
  rulesText: {
    textAlign: 'center'
  }
});
