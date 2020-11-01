import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions, Text, TouchableHighlight, TouchableOpacity, View, TextInput, Platform } from "react-native";
import HeaderComponent from '../../components/Header/header';
import InputComponent from '../../components/Input/input';
import { faArrowAltCircleLeft, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Users from '../../api/User';
import AsyncStorage from '@react-native-community/async-storage';
import { WaveIndicator } from 'react-native-indicators';
import ImagePicker from "react-native-image-picker";
import { faAngry } from '@fortawesome/free-regular-svg-icons';
import { API_LINK } from '../../App';


const screenWidth = Math.round(Dimensions.get('window').width - 70);

const STYLES = StyleSheet.create({
    ROW: {
      display: "flex",
      flexDirection: "row"
    },

    INPUT: {
        height: 60, 
        width: screenWidth,
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingLeft: 20
    }
});
  
const createFormData = (photo: { fileName: any; type: any; uri: string; }, body: { [x: string]: any; }) => {
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
};

const InscriptionScreen = ({ navigation }) => {
    const [status, setStatus] = useState(false)
    const [error, setError] = useState(false)
    const [errorM, setErrorM] = useState(false)
    const [errorU, setErrorU] = useState(false)
    const [pictureS, setPictureS] = useState(true)

    const [img, setImg] = useState({
        uri: 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
        type: ''
    })

    const [state, setState] = useState({
        name: '',
        mail: '',
        password: '',
        cPassword: ''
    })
    
    const _storeData = async () => {
        try {
            await AsyncStorage.setItem('@name', state.name)
            await AsyncStorage.setItem('@mail', state.mail)
        } catch (error) {
            console.log("error", error)
        }
    };

    const onPress = () => {
        setStatus(true)
        setErrorU(false)
        setErrorM(false)

        if (state.password !== "" && state.cPassword !== "" && state.name !== "" && state.mail !== "") {
            if (state.password === state.cPassword) {
                Users.Register({
                    pseudo: state.name,
                    email: state.mail,
                    password: state.password
                }, (res: any) => {
                    if (res == 200) {
                        setTimeout(() => {
                            setStatus(false);
                            setPictureS(true);
                        }, 2500)
                    } else {
                        setTimeout(() => {
                            setStatus(false);
                            setErrorU(true);
                        }, 3000)
                    }
                })
            } else {
                setTimeout(() => {
                    setStatus(false);
                    setError(true);
                }, 3000) 
            }
        } else {
            setTimeout(() => {
                setStatus(false);
                setErrorM(true);
            }, 3000)
        }
    }

    const Ze = () => {
        return (
            <>
                <Text style={{
                    color: "#6d9bff",
                    fontSize: 30,                    
                    marginBottom: 10,
                    textAlign: "center"
                }}>Bienvenue sur MyHero</Text>
      
                <Text style={{
                    color: "#6d9bff",
                    fontSize: 25,
                    marginBottom: 30,
                    textAlign: "center"
                }}>Inscription en cours</Text>
            </>
        );
    }

    if (status == true) {
        return (
            <View style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Ze />
                <WaveIndicator color='#6d9bff' size={40} />
            </View>
        );
    }

    const [avatar, setAvatar] = useState("https://s3.amazonaws.com/37assets/svn/765-default-avatar.png");

    const handlePicker = () => {
        ImagePicker.showImagePicker({}, (response: any) => {   
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            setImg({...img, uri: response.uri});

            fetch(`${API_LINK}/api/upload`, {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
              }),
              body: createFormData(response, {id: '123'}),
            })
              .then((data) => data.json())
              .then((res) => {
                console.log('upload succes', res);
                setImg({...img, uri: response.image});
              })
              .catch((error) => {
                console.log('upload error', error);
            });
          }
        });
      };


    if (pictureS == true) {
        return (
            <View style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    color: "#6d9bff",
                    fontSize: 30,                    
                    marginBottom: 40,
                    textAlign: "center"
                }}>Bienvenue sur MyHero</Text>
      
                <Text style={{
                    color: "#6d9bff",
                    fontSize: 20,
                    marginBottom: 5,
                    textAlign: "center"
                }}>Pour continuer votre inscription</Text>

                <Text style={{
                    color: "#6d9bff",
                    fontSize: 20,
                    marginBottom: 40,
                    textAlign: "center"
                }}>veuillez ajouter une photo</Text>

                { img.uri !== "" && 
                    <Image 
                        source={{uri: img.uri}}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            marginBottom: 20
                        }}
                    />
                }

                <TouchableOpacity onPress={() => handlePicker()}>
                    <Text style={{
                        color: "#000000",
                        fontSize: 20,
                        marginBottom: 30,
                        textAlign: "center"
                    }}>Choisir une photo</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => null}>
                        <View style={{
                            height: 60, 
                            width: screenWidth,
                            borderRadius: 7.5,
                            marginTop: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#6d9bff'           
                        }}>
                            <Text style={{
                                fontSize: 25
                            }}>Continuer</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        );
    }

    return (
        <>
            <View style={{
                display: 'flex',
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 35,
                paddingRight: 35,
            }}>
                <Text style={{
                    fontSize: 35,
                    textAlign: 'center',
                    marginBottom: 10
                }}>Inscription</Text>
                
                <Text style={{
                    marginBottom: 20
                }}>Créer son compte</Text>


                <View style={{
                    marginTop: 15,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <InputComponent name="Pseudo" placeholder="Pseudo" value={state.name} icon={faUser} onChange={(v: string) => setState({...state, name: v})} />
                    <InputComponent name="Identifiant" placeholder="Mail ou Télphone" value={state.mail} icon={faEnvelope} onChange={(v: string) => setState({...state, mail: v})} />
                    <InputComponent password={true} name="Mot de passe" placeholder="Mot de passe" value={state.password} icon={faLock} onChange={(v: string) => setState({...state, password: v})} />
                    <InputComponent password={true} name="Confirmer son mot de passe" placeholder="Confirmer son mdp" value={state.cPassword} icon={faLock} onChange={(v: string) => setState({...state, cPassword: v})} />
                
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 7.5,
                        flexDirection: 'row'
                    }}>
                        <Text>Vous avez un compte ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
                            <Text style={{
                                color: "#6d9bff"
                            }}> Se connecter</Text>
                        </TouchableOpacity>
                    </View>

                    {error && <Text style={{color: 'red', textAlign: "center", marginBottom: 7.5}}>Les deux mot de passe ne correspondent pas</Text>}
                    {errorM && <Text style={{color: 'red', textAlign: "center", marginBottom: 7.5}}>Les formulaires n'ont pas été remplis correctement</Text>}
                    {errorU && <Text style={{color: 'red', textAlign: "center", marginBottom: 7.5}}>Une erreur inconnue est survenue, veuillez ressayer plus tard</Text>}

                    <TouchableOpacity onPress={() => onPress()}>
                        <View style={{
                            height: 60, 
                            width: screenWidth,
                            borderRadius: 7.5,
                            marginTop: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#6d9bff'           
                        }}>
                            <Text style={{
                                fontSize: 25
                            }}>S'inscrire</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default InscriptionScreen;