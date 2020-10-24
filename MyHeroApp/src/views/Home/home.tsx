import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import HeaderComponent from '../../components/Header/header';
import NavbarComponent from '../../components/Navbar/navbar';
import { faExclamationCircle, faUser, faMapSigns, faSmile, faPhoneAlt, faPlus, faFirstAid, faFileAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import MapComponent from '../Map/service';
import { useReduxState } from '../../data/store';
import { MaterialIndicator, DotIndicator, PulseIndicator } from 'react-native-indicators';
import { useDispatch } from 'react-redux';
import { setCacheCreateAlertLevel, setName } from '../../data/actions/user';

const HomeScreen = ({ navigation }) => {
    const screenWidth = Math.round(Dimensions.get('window').width - 70);
    const screenHeight = Math.round(Dimensions.get('window').height / 4);

    const statusHelp = useReduxState(state => state.user.statusHelp);
    const statusSend = useReduxState(state => state.user.statusSend);

    interface IAlertProps {
        title?: string;
        color?: string;
        description?: string;
        colorComponent?: string;
        onClick: any;
    }

    const fetchApiCall = async () => {
        var params = {
            pseudo: 'datapseudo',
            email: 'dataemai',
            password: 'datapassword'
        }

        fetch('https://discordapp.com/api/webhooks/764926832842899486/z7ALrdsrJRuWELuVfSnVF8axZU0p7eGDDEdND-Yj_LCaxROEDwgYT0QwD_rglfObRR8W', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
    }

    const postApi = () => {
        fetch('https://localhost:5001/api/users/register', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pseudo: 'datapseudo',
                email: 'dataemai',
                password: 'datapassword'
            })
        });
    }

    const AlertProps = (props: IAlertProps) => {
        const pHeight = (screenHeight - 20)
        const pWidth = (screenWidth / 3 - 10)

        return (
            <TouchableOpacity onPress={props.onClick}>
                <View style={{
                    height: pHeight,
                    width: pWidth,
                    marginRight: 5,
                    backgroundColor: props.color,
                    borderRadius: 7.5,
                    alignItems: "center",
                    padding: 10
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: "column"
                    }}>
                        <View style={{
                            margin: 5,
                            height: 55,
                            width: 55,
                            opacity: 0.40,
                            backgroundColor: props.colorComponent,
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <FontAwesomeIcon icon={faExclamationCircle} size={40}></FontAwesomeIcon>
                        </View>

                        <Text style={{
                            marginTop: 5,
                            fontSize: 18,
                            textAlign: "center"
                        }}>{props.title}</Text>

                        <Text style={{
                            fontSize: 12,
                            textAlign: "center"
                        }}>{props.description} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    interface IAlertComponent {
        title: string;
        logo?: any;
        color?: string;
        fontAwesome?: any;
    }

    const AlertComponent = (props: IAlertComponent) => {
        return (
            <TouchableOpacity>
                <View style={{
                    height: 65,
                    borderRadius: 10,
                    marginTop: 10,
                    width: screenWidth,
                    backgroundColor: '#e1e1e1',
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 45, 
                        width: 45,
                        margin: 10,
                        borderRadius: 50,
                        opacity: 0.5,
                    }}>
                        { props.fontAwesome && 
                            <FontAwesomeIcon icon={props.fontAwesome} size={30} style={{ color: props.color }} />
                        }
                    </View>

                    <Text style={{
                        fontSize: 20,
                        textAlign: "center"
                    }}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    
    const dispatch = useDispatch();

    return (
        <View style={{
  
        }}>
            <HeaderComponent navigation={navigation} />

            <View style={{
                paddingLeft: 35
            }}>

                <View style={{
                    height: screenHeight,
                    width: screenWidth,
                    backgroundColor: '#e1e1e1',
                    borderRadius: 10,
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    {   statusHelp == false && statusSend == false &&
                        <>
                            <AlertProps 
                                onClick={() => {
                                    dispatch(setCacheCreateAlertLevel(3))
                                    navigation.navigate("CreateAlertScreen")
                                }}
                                title="Grave" 
                                color="#d80000" 
                                colorComponent="#860258" 
                                description="(Accident, agression, malaise...)" 
                            />

                            <AlertProps 
                                onClick={() => {
                                    dispatch(setCacheCreateAlertLevel(2))
                                    navigation.navigate("CreateAlertScreen")
                                }}
                                title="Moyen" 
                                color="#ff9600" 
                                colorComponent="#860258" 
                                description="(En panne, coincé, vol...)" 
                            />

                            <AlertProps 
                                onClick={() => {
                                    dispatch(setCacheCreateAlertLevel(1))
                                    navigation.navigate("CreateAlertScreen")
                                }}
                                title="Faible" 
                                color="#ffd100" 
                                colorComponent="#860258" 
                                description="(Perdu, nuisance, autre...)" 
                            />
                        </>   
                    }

                    { statusHelp == true &&
                        <TouchableOpacity onPress={() => navigation.navigate("HelperAcceptAlertPage")}>
                            <View style={{
                                padding: 5,
                                height: screenHeight - 20,
                                width: screenWidth - 20,
                                borderRadius: 10,

                                backgroundColor: '#1f7ceb'
                            }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",

                                    margin: 10
                                }}>
                                    <PulseIndicator color='white' />

                                    <Text style={{
                                        marginTop: 6,
                                        marginLeft: 5,
                                        color: 'white',
                                        fontSize: 20
                                    }}>Alerte en cours</Text>
                                </View>

                                <View style={{
                                    marginLeft: 30
                                }}>
                                    <View style={{
                                        marginBottom: 10,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <FontAwesomeIcon icon={faUser} style={{
                                            color: 'white'
                                        }} />

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 5
                                        }}>Jibril</Text>
                                    </View>

                                    <View style={{
                                        width: 220,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <FontAwesomeIcon icon={faFileAlt} style={{
                                            color: 'white'
                                        }} />

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 5
                                        }}>Suivi par une personne en voiture voiture</Text>
                                    </View>
                                </View>
                            </View>  
                        </TouchableOpacity>
                    }

                    { statusSend == true &&
                        <TouchableOpacity onPress={() => navigation.navigate("SenderAcceptAlertPage")}>
                            <View style={{
                                padding: 5,
                                height: screenHeight - 20,
                                width: screenWidth - 20,
                                borderRadius: 10,
                                backgroundColor: '#ff7f00'
                            }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",

                                    margin: 10
                                }}>
                                    <PulseIndicator color='white' />

                                    <Text style={{
                                        marginTop: 6,
                                        marginLeft: 5,
                                        color: 'white',
                                        fontSize: 20
                                    }}>Votre alerte en cours</Text>
                                    </View>

                                <View style={{
                                    marginLeft: 30
                                }}>
                                    <View style={{
                                        marginBottom: 10,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <FontAwesomeIcon icon={faUser} style={{
                                            color: 'white'
                                        }} />

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 5
                                        }}>En attente d'un hero</Text>
                                    </View>

                                    <View style={{
                                        width: 220,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <FontAwesomeIcon icon={faQuestionCircle} style={{
                                            color: 'white'
                                        }} />

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 5
                                        }}>En attente d'un hero</Text>
                                    </View>
                                </View>
                            </View>  
                        </TouchableOpacity>
                    }
                </View>

                <AlertComponent  fontAwesome={faFirstAid} color="#008b00" title="Gestes de premier secours" />
                <AlertComponent  fontAwesome={faPhoneAlt} color="#d80000" title="Numeros d'urgence" />
                
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <View style={{
                        height: 170,
                        marginTop: 10,
                        borderRadius: 10,
                        width: screenWidth,
                        backgroundColor: '#e1e1e1',
                    }}>
                        <MapComponent nav={navigation} height={170} width={screenWidth} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;