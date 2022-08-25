import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Upload from "../Upload";
import CameraPhoto from "../CameraPhoto";
import HomeScreen from "../HomeScreen";
import { View, Image, Text } from "react-native";
// import cameraIcon from '../../assets/icons/camera.png'
import UserHome from "../UserHome";
import Results from "../Results";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UploadStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
    }}
    >
      <Stack.Screen name="UploadStack" component={Upload} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="OpenCamera" component={CameraPhoto} />
    </Stack.Navigator>
  );
}

function CameraStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="CameraPhoto" component={CameraPhoto} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#1AB858",
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../../assets/icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#1AB858" : "black",
                  }}
                />
              </View>
            ),
          }}
        />
        {/* <Tab.Screen
          name="Camera"
          component={CameraStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../../assets/icons/camera.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#1AB858" : "black",
                  }}
                />
              </View>
            ),
          }}
        /> */}
        <Tab.Screen
          name="Add an Item"
          component={UploadStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../../assets/icons/image-gallery.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#1AB858" : "black",
                  }}
                />
              </View>
            ),
          }}
        />

        {/* *****************************
            PLACEHOLDER 
          *******************************/}
        <Tab.Screen
          name="User"
          component={UserHome}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../../assets/icons/user1.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#1AB858" : "black",
                  }}
                />
              </View>
            ),
          }}
        />
        {/******************************
            END USER PLACEHOLDER 
          ****************************** */}
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default Tabs;
