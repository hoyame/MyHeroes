import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import HeaderComponent from 'src/components/Header/header';

const AlertScreen = ({ navigation }) => {
    return (
        <>
            <HeaderComponent navigation={navigation} />

            <Text style={{
                fontSize: 35
            }}>Alert</Text>
        
            <Text onPress={() => navigation.navigate('Home')}>go home</Text>
        </>
    );
}

export default AlertScreen;