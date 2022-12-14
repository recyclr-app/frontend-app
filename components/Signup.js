import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Signup = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const newUser = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    }

    try {
      await axios({
        method: 'post',
        url: 'https://relievedmint.herokuapp.com/users/signup',
        data: newUser
      })
        .then((res) => {
          console.log(res.data)
        })
      
      navigation.navigate('Login')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
     } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
    <Image source={require('../assets/icons/appname.png')} style={styles.appName} />
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="first name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text onPress={handlePress} style={styles.login}>
        Existing User?
      </Text>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  appName: {
    resizeMode: 'contain',
    width: '50%',
    marginLeft: 10,
    marginTop: 45,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    backgroundColor: '#D0F2E2',
    width: '85%',
    marginBottom: 150,
    borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inputContainer: {
    width: "70%",
  },
  input: {
    paddingTop: 15,
    paddingBottom: 5,
    marginTop: 5,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  login: {
    marginTop: 40,
  },
});

export default Signup;
