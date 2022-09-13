import { SafeAreaView, Text, Image } from "react-native";

export default function Quiz() {

  return (
    <SafeAreaView styles={{ flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'}}>
      <Image source={require('../assets/giphy.gif')} resizeMode='contain'
        style={{
          width: 345,
          height: 245,
          marginTop: 50,
          alignSelf: 'center',
        }} />
        <Text style={{ alignSelf: 'center' }}>Quiz Coming Soon!</Text>
    </SafeAreaView>
  );
}

