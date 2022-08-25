import { View, Text, Image } from "react-native";
import React from "react";

const AppInfo = () => {
  return (
    <View>
      <Image source={require("../assets/icons/recycle2.png")} />
      <Text>Built with love from Austin and Seattle</Text>
      <Text>
        Recycle is a free app developed with sustainability in mind. Bring the
        world a step closer to being a better place by helping others live more
        sustainable lives by encouraging people to recycle. The goal of this app
        is to make the world a better place through awareness, education and
        conservation. It's designed to help you know what you can recycle and
        how to recycle it as well as other information on sustainability.
        Individuals of all ages will be able to contribute in keeping our planet
        green. The initial concept was to make it easy for consumers to recycle
        waste products. We want people to be more mindful of their impact on the
        environment so they can continue living authentically in the face of
        challenging circumstances. There are over 700 million tons of trash
        thrown into our landfills each year. We want to help you recycle what
        you throw away. With Recycler you can get all the information you need
        on your recyclables, in a clean, simple and visually appealing way.
      </Text>
    </View>
  );
};

export default AppInfo;
