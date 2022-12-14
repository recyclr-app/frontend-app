import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Signup");
  };

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (text, field) => {
    setUser({ ...user, [field]: text });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (user.email !== "" && user.password !== "") {
      await axios
        .post("https://relievedmint.herokuapp.com/users/signin", user)
        .then((res) => {
          const jsonValue = JSON.stringify(res.data);
          AsyncStorage.setItem("auth", jsonValue);
        });
    }
    setUser('')
    navigation.navigate("UserMenu");
  };

  const handleGuestMode = () => {
    AsyncStorage.clear();
    navigation.navigate("UserMenu");
  };

  return (
    <>
      <Image source={require('../assets/icons/appname.png')} style={styles.appName} />
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          value={user.email}
          onChangeText={(text) => handleChange(text.toLowerCase(), "email")}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          value={user.password}
          onChangeText={(text) => handleChange(text, "password")}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogIn}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Log in</Text>
        </TouchableOpacity>
      </View>

      <Text onPress={handlePress} style={styles.login}>
        New User?
      </Text>
      <Text onPress={handleGuestMode} style={styles.login}>
        Continue as a guest
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
    borderBottomColor: "black",
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

export default Login;
