import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Signup = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView>
      <Text>Signup</Text>
      <Text onPress={handlePress}>Login</Text>
    </SafeAreaView>
  )
}

export default Signup;