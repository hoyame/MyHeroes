import * as React from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Text, View } from '../../core/components/Themed';
import EditScreenInfo from '../../core/components/EditScreenInfo';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import HeaderComponent from '../components/Header';
import HomeButtonComponent from '../components/HomeButtons';

import { faExclamationCircle, faUser, faMapSigns, faSmile } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});

interface IAlert {
  color: string;
  title: string;
}

const HomeScreen = () => {
  const AlertProps = (props: IAlert) => {
    return (
      <View style={{
        marginLeft: 10,
        marginTop: 40,
        width: 95,
        height: 120,
        borderRadius: 7.5
      }}>
        
        <View style={{
          height: 60,
          width: 60,
          borderRadius: 50,
          opacity: 1,
          marginTop: 15,
          marginLeft: 17.5,
          backgroundColor: props.color
        }}>
          <FontAwesomeIcon icon={faExclamationCircle} size={35} style={{
            margin: 12
          }}></FontAwesomeIcon>
        </View>

        <Text style={{
            color: props.color,
            fontSize: 20,
            marginTop: 10,
            textAlign: "center"
        }}>{props.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderComponent />

      <View style={{
        marginTop: 200,
        display: 'flex',
        flexDirection: 'row',
      }}>
        <View style={{
          height: 180,
          width: 325,
          backgroundColor: "#1E1B18",
          borderRadius: 7,
          margin: 10
        }}>
          <Text style={{
            color: "white",
            fontSize: 25,
            textAlign: "center",
            marginTop: 10,
            marginBottom: -30
          }}>Lancer une alerte</Text>

          <View style={{
            display: "flex",
            backgroundColor: "transparent",
            flexDirection: "row"
          }}>
            <AlertProps color="#da0000" title="Grave" />
            <AlertProps color="#ff8a00" title="Moyen" />
            <AlertProps color="#ffc7b8" title="Faible" />
          </View>

        </View>

      </View>

      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={{
         height: 220,
         width: 320,
         borderRadius: 10
       }}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
    </View>
  );
}

export default HomeScreen;