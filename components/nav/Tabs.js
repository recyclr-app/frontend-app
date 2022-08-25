import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Upload from "../Upload";
import CameraPhoto from "../CameraPhoto";
import HomeScreen from "../HomeScreen";
import { View, Image, Text } from "react-native";
// import cameraIcon from '../../assets/icons/camera.png'
import UserMenu from "../UserMenu";
import Results from "../Results";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UploadStack() {
  return(
    <Stack.Navigator >
      <Stack.Screen name="UploadStack" component={Upload} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  )
}

function CameraStack() {
  return(
    <Stack.Navigator >
      <Stack.Screen name="CameraPhoto" component={CameraPhoto} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  )
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
        name="HomeScreen"
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
      <Tab.Screen
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
      />
      <Tab.Screen
        name="Upload"
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
      </Tab.Group>

      {/* *****************************
            PLACEHOLDER 
       *******************************/}
      <Tab.Screen
        name="User"
        component={UserMenu}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Text>User</Text>
            </View>
          ),
        }}
      />
      {/******************************
            END USER PLACEHOLDER 
       ****************************** */}
    </Tab.Navigator>
  );
};

export default Tabs;
