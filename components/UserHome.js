import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Components
import AppInfo from "./AppInfo";
import Badges from "./Badges";
import Quiz from "./Quiz";
import React from "react";
import RecyclingGuide from "./RecyclingGuide";
import Settings from "./Settings";
import UserHistory from "./UserHistory";
import UserMenu from "./UserMenu";

const Stack = createNativeStackNavigator();

export default function UserHome() {
  return (
    <Stack.Navigator initialRouteName="UserMenu" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="AppInfo" component={AppInfo} />
      <Stack.Screen name="Badges" component={Badges} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="RecyclingGuide" component={RecyclingGuide} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="UserHistory" component={UserHistory} />
      <Stack.Screen name="UserMenu" component={UserMenu} />
    </Stack.Navigator>
  );
}
