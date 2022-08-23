import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/Main";
import { SafeAreaView } from "react-native";
import { colors } from "./globalstyles";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Main />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: `${colors.green1}`,
    alignItems: "center",
    justifyContent: "center",
  },
});
