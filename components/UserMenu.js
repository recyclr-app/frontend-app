import { colors } from "../globalstyles";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import { links } from "./UserMenuLinks";

export default function UserMenu() {
  return (
    <View style={styles.userMenu_container}>
      {links.map((link, idx) => (
        <View style={styles.userMenuIcon_outerContainer} key={idx}>
          <View style={styles.userMenuIcon_innerContainer} key={idx}>
            <Image style={styles.userMenuIcon} source={link.image} />
          </View>
          <Text style={styles.userMenuIcon_label}>{link.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  userMenuIcon_innerContainer: {
    flexDirection: "column",
    width: 120,
    // flexWrap: "wrap",
  },
  userMenuIcon_outerContainer: { width: 150 },
  userMenuIcon_innerContainer: {
    backgroundColor: colors.green2,
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
  },
  userMenuIcon: {
    width: 80,
    height: 80,
    marginLeft: "auto",
    marginRight: "auto",
  },
  userMenuIcon_label: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
