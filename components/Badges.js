import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../globalstyles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Badges = () => {
  const [localData, setLocalData] = useState({ token: "", id: "" });
  const [historyItems, setHistoryItems] = useState()
  
  //input logic to check for history
  useEffect(() => {
    const getLocalData = async () => {
      try {
        const fetchStorage = await AsyncStorage.getItem("auth");
        if (fetchStorage) {
          setLocalData(JSON.parse(fetchStorage));
        } else setLocalData({ token: "", id: "" });
      } catch (err) {
        console.log(err);
      }
    };
    getLocalData();
  }, []);

  
  useEffect(() => {
    console.log(localData); //DELETE LATER
    if (localData.token) {
      async function fetchData() {
        try {
          const res = await axios.get(
            "https://relievedmint.herokuapp.com/users/" + localData.id,
            {
              headers: {
                Authorization: `Bearer ${localData.token}`,
              },
            }
          );
          const num = (res.data.history).length
          setHistoryItems(num)
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    }
  }, [localData]);



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.badgeText}>Badges Earned</Text>
      <ScrollView>
      {historyItems > 0 ? <View style={styles.badge}>
              <Image source={require('../assets/icons/environmentalism.png')} style={styles.image} />
            <Text style={styles.achievementName}>Recycle Rookie</Text>
      </View> : <Text style={{ alignSelf: 'center' }}>Oops! You haven't earned any badges yet. </Text>}
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
