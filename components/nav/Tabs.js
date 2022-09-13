import { View, Image } from "react-native";
import UserStack from "./stacks/UserStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import UploadStack from "./stacks/UploadStack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#6ED3A6",
        tabBarStyle: {
          width: "90%",
          height: 70,
          marginVertical: 25,
          marginHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 12,
          position: "absolute",
          borderRadius: 50,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          alignItems: "center",
          justifyContent: "space-evenly",
        },
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name="Add an Item"
          component={UploadStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Ionicons name="add-outline" size={30} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={UserStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../../assets/icons/user1.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "black",
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
``
export default Tabs;
