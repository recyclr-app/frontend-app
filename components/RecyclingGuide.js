import {
  Text,
  View,
  Linking,
  SafeAreaView,
  Button,
  StyleSheet,
} from "react-native";
import React, { Component } from "react";
import { colors } from "../globalstyles";
export class RecyclingGuide extends Component {
  render() {
    const uriEpa = "https://www.epa.gov/recycle";
    const uriWM =
      "https://app.copy.ai/projects/7182734?tab=results&tool=ProductDescriptions";
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Additional Resources</Text>
          <View style={styles.articleContainer}>
            <Text style={styles.textArticle}>
              U.S. Environmental Protection Agency
            </Text>
            <Text style={styles.textBody}>
              By reducing, reusing, and recycling, you can save money and
              natural resources and help keep our planet beautiful by reducing
              waste.
            </Text>
            <Button
              onPress={() => Linking.openURL(uriEpa)}
              title="Visit Site"
            />
          </View>
          <View style={styles.articleContainer}>
            <Text style={styles.textArticle}>
              Waste Management Recycling 101
            </Text>
            <Text style={styles.textBody}>
              Recycling is the key to protecting our planet. But we need your
              help to make sure everything that enters your recycling bin finds
              a second life: glass, plastic, cardboard and more.
            </Text>
            <Button onPress={() => Linking.openURL(uriWM)} title="Visit Site" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textTitle: {
    fontSize: 15,
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 40,
    fontWeight: "300",
  },
  textArticle: {
    fontSize: 20,
    marginBottom: 20,
  },
  textBody: {
    fontSize: 15,
    marginBottom: 10,
  },
  articleContainer: {
    marginBottom: 50,
  },
});
export default RecyclingGuide;
