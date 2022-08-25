import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Results from '../Results'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Group screenOptions={{ tabBarShowLabel: false, headerShown: false, presentation: 'modal'}}>
            <Stack.Screen name='Results' component={Results} />
        </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigator