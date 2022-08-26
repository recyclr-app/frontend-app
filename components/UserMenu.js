import { colors } from "../globalstyles";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  Button
} from "react-native";
import React, { useState } from "react";
import { links } from "./UserMenuLinks";
import { useNavigation } from "@react-navigation/native";
import AchievementModal from "./AchievementModal";

export default function UserMenu({ route }) {
  const navigation = useNavigation();
  const { achievement } = route?.params || {};
  console.log(` user achievemnt is: ${achievement}`)

  const [modalVisible, setModalVisible] = useState(achievement > 0 ? true : false)
  // const [modalVisible, setModalVisible] = useState(true)
  console.log(modalVisible)

  const handlePress = (component) => {
    navigation.navigate(component);
  };

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
  userMenu_container: {},
  userMenuIcon_innerContainer: {
    flexDirection: "column",
    width: 120,
  },
  userMenuIcon_outerContainer: {
    // width: 150,
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
    margin: 20,
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
  }
});
