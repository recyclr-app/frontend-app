import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { colors } from "../globalstyles";

const AppInfo = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("../assets/icons/recycle2.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>ryclr app </Text>
          <Text style={styles.subtitle}>
            Built with love from Austin and Seattle, {"\n"}©{" "}
            {new Date().getFullYear()}
          </Text>

          <Text style={styles.textBody}>
            recyclr is a free app developed with sustainability in mind. The
            goal of this app is to make the world a better place through
            awareness, education and conservation. {"\n"} {"\n"}It's designed to
            help you know what you can recycle and how to recycle it as well as
            other information on sustainability. Individuals of all ages will be
            able to contribute in keeping our planet green. {"\n"} {"\n"}The
            initial concept was to make it easy for consumers to recycle waste
            products. We want people to be more mindful of their impact on the
            environment so they can continue living authentically in the face of
            challenging circumstances. {"\n"} {"\n"}There are over 700 million
            tons of trash thrown into our landfills each year. We want to help
            you recycle what you throw away. With recyclr you can get all the
            information you need on your recyclables, in a clean, simple and
            visually appealing way.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  logo: {
    aspectRatio: 1,
    height: 175,
    margin: "auto",
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    resizeMode: "cover",
  },
  title: {
    textAlign: "center",
    fontSize: "30",
  },
  subtitle: {
    textAlign: "center",
    margin: 20,
    fontWeight: "200",
  },
  textBody: {
    letterSpacing: 1,
    lineHeight: 25,
    fontSize: 20,
    fontWeight: "200",
  },
});
export default AppInfo;
