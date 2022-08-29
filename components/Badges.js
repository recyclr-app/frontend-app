import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../globalstyles'

const Badges = () => {

  //input logic to check for history

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.badgeText}>Badges Earned</Text>
      <ScrollView>
      <View style={styles.badge}>
              <Image source={require('../assets/icons/environmentalism.png')} style={styles.image} />
            <Text style={styles.achievementName}>Recycle Rookie</Text>
      </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Badges

const styles = StyleSheet.create({

  badgeText: {
      margin: 16,
      marginTop: 20,
      fontSize: 30,
      fontWeight: "600",
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 300,
    height: 330,
    borderColor: '#B3B3B3',
    borderWidth: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
},
image: {
    resizeMode: 'contain',
    width: 180,
    height: 180,
},
achievementName: {
    color: colors.green1,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20
},
})
