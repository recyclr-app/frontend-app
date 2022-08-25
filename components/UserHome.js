import { colors } from "../globalstyles";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import React from "react";
import { links } from "./UserMenuLinks";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppInfo from "./AppInfo";
import Settings from "./Settings";
import { TouchableOpacity } from "react-native-web";

const Stack = createNativeStackNavigator();

function UserMenu() {
  const navigation = useNavigation();

  const handlePress = (event) => {
    console.log(event.target.value);
    console.log(event.target.title);
    console.log(event.target);
    // navigation.navigate("AppInfo");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <View style={styles.userMenu_container}>
          {links.map((link, idx) => (
            <View style={styles.userMenuIcon_outerContainer} key={idx}>
              <View style={styles.userMenuIcon_innerContainer} key={idx}>
                <Image style={styles.userMenuIcon} source={link.image} />
              </View>
              <Text style={styles.userMenuIcon_label}>{link.label}</Text>
            </View>
          ))}
        </View> */}
        <Button onPress={handlePress} title="test" />
        {/* <TouchableOpacity
          onPress={handlePress}
          title="Settings"
          value="Settings"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function UserHome() {
  return (
    //
    <Stack.Navigator>
      <Stack.Screen name="UserMenu" component={UserMenu} />
      <Stack.Screen name="AppInfo" component={AppInfo} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
    //
  );
}

const styles = StyleSheet.create({
  userMenuIcon_innerContainer: {
    flexDirection: "column",
    width: 120,
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
