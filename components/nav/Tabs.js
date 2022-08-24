import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "./Home";
import Upload from "../Upload";
<<<<<<< HEAD
import UserMenu from "../UserMenu";
import CameraPhoto from "../CameraPhoto";
import Main from "../Main";
import { View, Image, Text } from "react-native";
// import cameraIcon from '../../assets/icons/camera.png'

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#1AB858",
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
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
        name="Take a Photo"
        component={CameraPhoto}
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
        component={Upload}
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
      {/******************************
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
       *******************************/}
    </Tab.Navigator>
  );
};

export default Tabs;
=======
import CameraPhoto from "../CameraPhoto";
import Main from '../Main'
import { View, Image, Text } from 'react-native'
// import cameraIcon from '../../assets/icons/camera.png'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#1AB858'
            }}>
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../../assets/icons/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#1AB858' : 'black'
                                }}
                            />
                        </View>
                    )
                }} 
            />
            <Tab.Screen
                name="Take a Photo"
                component={CameraPhoto}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../../assets/icons/camera.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#1AB858' : 'black'
                                }}
                            />
                        </View>
                    )
                }}    
            />
            <Tab.Screen
                name="Upload"
                component={Upload}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image
                                source={require('../../assets/icons/image-gallery.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#1AB858' : 'black'
                                }}
                            />
                        </View>
                    )
                }} 
            />
        </Tab.Navigator>
    )
}

export default Tabs;
>>>>>>> e455614a5f50a396439e031fbced42b763246dbc
