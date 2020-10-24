import React, { Component } from "react";
import { Platform, View, Text, Dimensions } from "react-native";
import MapComponent from "./service";
import HeaderComponent from "./header";

const MapScreen = ({ navigation }) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);

  return (
    <View>
      <MapComponent nav={navigation} height={screenHeight} width={screenWidth} />
      <HeaderComponent navigation={navigation} />
    </View>
  );
}

export default MapScreen;