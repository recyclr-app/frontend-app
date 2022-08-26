import {
  View,
  Image,
  Text
} from "react-native";
import Upload from "../Upload";
import CameraPhoto from "../CameraPhoto";
import HomeScreen from "../HomeScreen";
import UserHome from "../UserHome";
import Results from "../Results";
import UserMenu from "../UserMenu";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

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
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }} > */}
        <Stack.Screen name="Results" component={Results} />
      {/* </Stack.Group> */}
      <Stack.Screen name="OpenCamera" component={CameraPhoto} />
      <Stack.Screen name="Achievement Page" component={UserMenu} />
      
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
        tabBarStyle: {
          width: '90%',
          height: 70,
          margin: 25,
          paddingTop: 12,
          paddingBottom: 12,
          position: 'absolute',
          borderRadius: 50,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          alignItems: 'center',
          justifyContent: 'space-between'
        }
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
        <Tab.Screen
          name="Add an Item"
          component={UploadStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Ionicons name='add-outline' size={30} />
                {/* <Image
                  source={require("../../assets/icons/image-gallery.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#1AB858" : "black",
                  }}
                /> */}
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
