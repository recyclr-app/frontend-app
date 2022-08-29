import CameraPhoto from "../../CameraPhoto";
import Upload from "../../Upload";
import Results from "../../Results";
import UserMenu from "../../UserMenu";
import Login from "../../Login"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../Signup";

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
      <Stack.Screen name="Achievement Page" component={UserMenu} />
      <Stack.Screen name="LoginPage" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      
    </Stack.Navigator>
  );
}

export default UploadStack