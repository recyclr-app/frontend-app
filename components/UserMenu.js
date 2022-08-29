import { colors } from "../globalstyles";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { links } from "./UserMenuLinks";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AchievementModal from "./AchievementModal";

export default function UserMenu({ route }) {
  const navigation = useNavigation();
  const { achievement } = route?.params || {};
  const [username, setUsername] = useState("");
  // console.log(` user achievemnt is: ${achievement}`);

  const [modalVisible, setModalVisible] = useState(
    achievement > 0 ? true : false
  );
  // console.log(modalVisible);
  
  // refresh screen on every load
  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused])

  const handlePress = (component) => {;
    navigation.navigate(component);
  };

  const handleSignIn = () => {
    navigation.navigate("Signup");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchStorage = await AsyncStorage.getItem("auth");
        console.log(fetchStorage);
        if (fetchStorage) {
          setUsername(JSON.parse(fetchStorage).firstname);
        } else {
          setUserName("");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  });
  console.log("hi");

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AchievementModal setModalVisible={setModalVisible} />
      </Modal>

<<<<<<< HEAD
      <View style={{ justifyContent: "center", height: 100 }}>
        {username ? (
          <Text style={styles.userHeader}>Welcome {username}!</Text>
        ) : (
          <Text style={styles.userHeader}>
            <Text style={{ color: colors.green2 }} onPress={handleSignIn}>
              Sign in{" "}
            </Text>
            to save progress
          </Text>
        )}
=======
      <View style={{ justifyContent: 'center', height: 100 }}>
        <Text style={styles.userHeader}>
          <Text style={{ color: colors.green2 }} onPress={handleSignIn}>Sign in </Text>
        to save progress</Text>
>>>>>>> ed1cf34 (badges render)
        <View style={styles.line} />
      </View>

      <ScrollView>
        <View style={styles.userMenu_container}>
          {links.map((link, idx) => (
            <View style={styles.userMenuIcon_outerContainer} key={idx}>
              <View
                style={styles.userMenuIcon_innerContainer}
                key={idx}
                onStartShouldSetResponder={() => {
                  handlePress(link.component);
                }}
              >
                <Image style={styles.userMenuIcon} source={link.image} />
              </View>
              <Text style={styles.userMenuIcon_label}>{link.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userMenu_container: {
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 15,
  },
  userHeader: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    color: colors.lightblack,
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    width: "90%",
    alignSelf: "center",
  },
  userMenuIcon_innerContainer: {
    flexDirection: "column",
    width: 120,
  },
  userMenuIcon_outerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  userMenuIcon_innerContainer: {
    backgroundColor: colors.green2,
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "column",
    flexBasis: "50%",
    marginHorizontal: 45,
    marginTop: 10,
    width: 90,
    height: 90,
  },
  userMenuIcon: {
    width: 60,
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  userMenuIcon_label: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    color: colors.lightblack,
  },
});
