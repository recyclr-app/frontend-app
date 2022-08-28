import { View, Text, SafeAreaView, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

const Signup = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Login')
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async(e) => {
    e.preventDefault()

    const newUser = {
      firstname: firstName,
      lasname: lastName,
      email: email,
      password: password
    }

    try {
      await axios({
        method: 'post',
        url: 'https://relievedmint.herokuapp.com/users/',
        data: newUser
      })
        .then((res) => {
          console.log(res.data)
        })
      
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')

     } catch (err) {
      console.log(err)
    }
  }

  return (
    <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
      >
      <View style={styles.inputContainer}>
                <TextInput
                  placeholder='first name'
                  value={firstName}
                  onChangeText={text => setFirstName(text) }
                  style={styles.input}
                />
                <TextInput
                  placeholder='last name'
                  value={lastName}
                  onChangeText={text => setLastName(text) }
                  style={styles.input}
              />
              <TextInput
                  placeholder='email'
                  value={email}
                  onChangeText={text => setEmail(text) }
                  style={styles.input}
              />
              <TextInput
                  placeholder='password'
                  value={password}
                  onChangeText={text => setPassword(text) }
                  style={styles.input}
                  secureTextEntry
              /> 
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
                  onPress={() => {handleSignUp}}
                  style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>

          <Text onPress={handlePress} style={styles.login}>Existing User?</Text>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
},
inputContainer: {
    width: '80%'
},
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
},
buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
},
button: {
    backgroundColor: 'black',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
},
buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2
},
buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
},
buttonOutlineText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  login: {
  marginTop: 40
}
})


export default Signup;