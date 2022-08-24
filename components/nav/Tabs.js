import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "./Home";
import Upload from "../Upload";
import CameraPhoto from "../CameraPhoto";
import Main from '../Main'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Main" component={Main} />
            <Tab.Screen name="Take a Photo" component={CameraPhoto} />
            <Tab.Screen name="Upload" component={Upload} />
        </Tab.Navigator>
    )
}

export default Tabs;