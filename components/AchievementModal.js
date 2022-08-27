import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from "../globalstyles";
import { Ionicons } from '@expo/vector-icons';

const AchievementModal = ({setModalVisible}) => {
  return (
      <View style={styles.modal}>
          <Ionicons
              name='close-outline'
              size={30}
              color='white'
              style={styles.close}
              onPress={() => setModalVisible(false)}  
          />
            <Text style={styles.modalText}>Well done!</Text>
            <Text style={styles.achievementText}>Achievement Badge Unlocked!</Text>
          <View style={styles.badge}>
              <Image source={require('../assets/icons/environmentalism.png')} style={styles.image} />
            <Text style={styles.achievementName}>Recycle Rookie</Text>
        </View>
  </View>
  )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%',
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    modalText: {
        color: colors.green1,
        fontSize: 48,
        fontWeight: 'bold',
    },
    achievementText: {
        marginTop: 100,
        marginBottom: 5,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: 'white',
        width: 300,
        height: 330,
        borderColor: '#B3B3B3',
        borderWidth: 5,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
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

export default AchievementModal