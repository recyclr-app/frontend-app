import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import React from "react";
import Logout from "./Logout";
import { colors } from "../globalstyles";

const Settings = () => {
  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>
        <Text style={styles.pageTitle}>Settings{"\n"}</Text>
        <Logout
          component="UserMenu"
          buttonContainer={styles.logout}
          buttonText={styles.logoutText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    margin: 16,
    marginTop: 40,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "600",
  },
  logout: {
    backgroundColor: colors.green2,
    padding: 15,
    borderRadius: 100,
    textAlign: "center",
  },
  logoutText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 1.25,
  },
});

export default Settings;
