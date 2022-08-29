import { StyleSheet, Text, View, SafeAreaView, Image, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../globalstyles";

export default function Results({ route }) {

  const [achievement, setAchievement] = useState(1)
  const { cvResults } = route.params;
  const navigation = useNavigation();
  

  const recycleIt = () => {
    setAchievement(prev => ++prev)
    console.log(`result achievment is ${achievement}`)
    navigation.navigate('Achievement Page', { achievement: achievement })
  }
  
  const trashIt = () => {
    navigation.navigate('Achievement Page')
  }


  return (
    <SafeAreaView >
     
      <View style={styles.resultsContainer}>
      <Text style={styles.item}>This looks like a {cvResults.item}.</Text>
      {/* <Image source={{ uri: cvResults.url }} style={styles.resultImage} /> */}
      
        {cvResults.recyclable === true ? 
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.isRecyclable}>This item appears recyclable!</Text>
            <Image source={require('../assets/icons/recycle-bin.png')} style={styles.image} />
            <TouchableOpacity style={styles.continue} onPress={recycleIt}>
              <Text style={{ fontSize: 18 }}> >> Continue?</Text>
          </TouchableOpacity>
        </View>
          :
        <View style={{ alignItems: 'center' }}>
          <Text>Sorry, this item is not recycleable</Text>
            <Image source={require('../assets/icons/cancel.png')} style={styles.image} />
          <TouchableOpacity style={styles.continue} onPress={trashIt}>
              <Text style={{ fontSize: 18 }}> >> Continue?</Text>
          </TouchableOpacity> 
        </View>
        }

      <Text style={styles.rulesText}>Always check local regulations and labels, where applicable, before disposing of an item.</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  resultImage: {
    resize: 'auto',
    width: '20%',
    height: '20%'
  },
  item: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  isRecyclable: {
    fontSize: 16,
    marginBottom: 10
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 15
  },
  rulesText: {
    textAlign: 'center'
  },
  continue: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: colors.green2,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }
});
