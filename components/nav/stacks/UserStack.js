import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppInfo from "../../AppInfo";
import Badges from "../../Badges";
import Quiz from "../../Quiz";
import React from "react";
import RecyclingGuide from "../../RecyclingGuide";
import Settings from "../../Settings";
import UserHistory from "../../UserHistory";
import UserMenu from "../../UserMenu";
import Signup from "../../Signup";
import Login from "../../Login";

const Stack = createNativeStackNavigator();

export default function UserHome() {
  return (
    <Stack.Navigator
      initialRouteName="UserMenu"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AppInfo" component={AppInfo} />
      <Stack.Screen name="Badges" component={Badges} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="RecyclingGuide" component={RecyclingGuide} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="UserHistory" component={UserHistory} />
      <Stack.Screen name="UserMenu" component={UserMenu} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
