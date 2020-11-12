import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import HeaderComponent from '../../components/Header/headerTw';
import NavbarComponent from '../../components/Navbar/navbar';
import { faExclamationCircle, faUser, faMapSigns, faSmile, faPhoneAlt, faPlus, faFirstAid, faFileAlt, faQuestionCircle, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import MapComponent from '../Map/service';
import { useReduxState } from '../../data/store';
import { MaterialIndicator, DotIndicator, PulseIndicator } from 'react-native-indicators';
import { useDispatch } from 'react-redux';
import { setCacheCreateAlertLevel, setCacheNav, setName } from '../../data/actions/user';
import I18n from '../../i18n/i18n';
//import SosSVG from '../../assets/sos.svg'

const HomeScreen = ({ navigation }) => {
    const screenWidth = Math.round(Dimensions.get('window').width - 70);
    const screenHeight = Math.round(Dimensions.get('window').height / 4);
    
    const alertDataHelp = useReduxState(state => state.user.showAlert);
    const alertDataSend = useReduxState(state => state.user.send);
    const statusHelp = useReduxState(state => state.user.help.status);
    const statusSend = useReduxState(state => state.user.send.status);
    const createAlertLevel = useReduxState(state => state.user.createAlertLevel)

    interface IAlertProps {
        title?: string;
        color?: string;
        description?: string;
        colorComponent?: string;
        onClick: any;
    }

    const returnColor = (alert: number) => {
        switch (alert) {
            case 1: 
                return "#ffd100";
            case 2: 
                return "#ff9600";
            case 3:
                return "#d80000";
            default: 
                return "";
        }
    }

    const AlertProps = (props: IAlertProps) => {
        const pHeight = (screenHeight - 20)
        const pWidth = (screenWidth / 3 - 10)

        return (
            <TouchableOpacity onPress={props.onClick}>
                <View style={{
                    height: 165,
                    width: pWidth,
                    marginRight: 5,
                    backgroundColor: props.color,
                    borderRadius: 7.5,
                    alignItems: "center",
                    padding: 10
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            margin: 5,
                            height: 55,
                            width: 55,
                            opacity: 0.40,
                            backgroundColor: props.colorComponent,
                            borderRadius: 50,
                            //display: 'flex',
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
        onClick?: any;
    }

    const AlertComponent = (props: IAlertComponent) => {
        return (
            <TouchableOpacity onPress={props.onClick}>
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
            display: "flex",
        }}>
            <HeaderComponent navigation={navigation} />

            <View style={{
                paddingLeft: 35
            }}>

                <View style={{
                    height: 185,
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
                                    dispatch(setCacheNav('Home'));
                                    dispatch(setCacheCreateAlertLevel(3))
                                    navigation.navigate("CreateAlertScreen")
                                }}
                                title={I18n.t("alertGrave")}
                                color="#d80000" 
                                colorComponent="#860258" 
                                description={I18n.t("alertDescGrave")} 
                            />

                            <AlertProps 
                                onClick={() => {
                                    dispatch(setCacheNav('Home'));
                                    dispatch(setCacheCreateAlertLevel(2))
                                    navigation.navigate("CreateAlertScreen")
                                }}
                                title={I18n.t("alertMoyen")}
                                color="#ff9600" 
                                colorComponent="#860258" 
                                description={I18n.t("alertDescMoyen")}
                            />

                            <AlertProps 
                                onClick={() => {
                                    dispatch(setCacheNav('Home'));
                                    dispatch(setCacheCreateAlertLevel(1))
                                    navigation.navigate("CreateAlertScreen")
                                }}
                                title={I18n.t("alertFaible")}
                                color="#ffd100" 
                                colorComponent="#860258" 
                                description={I18n.t("alertDescFaible")}
                            />
                        </>   
                    }

                    { statusHelp == true &&
                        <TouchableOpacity onPress={() => navigation.navigate("HelperAcceptAlertPage")}>
                            <View style={{
                                padding: 5,
                                height: 165,
                                width: screenWidth - 20,
                                borderRadius: 10,
                                backgroundColor: returnColor(createAlertLevel)
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
                                    }}>{I18n.t("alertInProgress")}</Text>
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
                                        }}>{alertDataHelp.source}</Text>
                                    </View>

                                    <View style={{
                                        width: screenWidth - 80,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <FontAwesomeIcon icon={faFileAlt} style={{
                                            color: 'white'
                                        }} />

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 5
                                        }}>{alertDataHelp.description}</Text>
                                    </View>
                                </View>
                            </View>  
                        </TouchableOpacity>
                    }

                    { statusSend == true &&
                        <TouchableOpacity onPress={() => { dispatch(setCacheNav('Home')); navigation.navigate("SenderAcceptAlertPage")}}>
                            <View style={{
                                padding: 5,
                                height: 165,
                                width: screenWidth - 20,
                                borderRadius: 10,
                                backgroundColor: returnColor(createAlertLevel)
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
                                    }}>{I18n.t("alertInProgress")}</Text>
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
                                        }}>.......</Text>
                                    </View>

                                    <View style={{
                                        marginBottom: 10,
                                        width: screenWidth - 80,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <FontAwesomeIcon icon={faQuestionCircle} style={{
                                            color: 'white'
                                        }} />

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 5
                                        }}>En attente</Text>
                                    </View>

                                    <View style={{
                                        width: screenWidth - 80,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                        <FontAwesomeIcon icon={faFileAlt} style={{
                                            color: 'white'
                                        }} />

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 5
                                        }}>{alertDataSend.data.description}</Text>
                                    </View>
                                </View>
                            </View>  
                        </TouchableOpacity>
                    }
                </View>

                <AlertComponent onClick={() => { dispatch(setCacheNav('Home')); navigation.navigate('GDPS')}} fontAwesome={faFirstAid} color="#008b00" title={I18n.t("gdps")} />
                <AlertComponent onClick={() => { dispatch(setCacheNav('Home')); navigation.navigate('NDU')}} fontAwesome={faPhoneAlt} color="#d80000" title={I18n.t("ndu")} />
      
                <TouchableOpacity onPress={() => { dispatch(setCacheNav('Home')); navigation.navigate('Map')}}>
                    <View style={{
                        height: Dimensions.get('window').height > 695 ? 170: 135,
                        marginTop: 10,
                        borderRadius: 10,
                        width: screenWidth,
                        backgroundColor: '#e1e1e1',
                    }}>
                        <MapComponent nav={navigation} height={Dimensions.get('window').height > 695 ? 170: 145} width={screenWidth} />
                    </View>
                </TouchableOpacity>
 
                { Dimensions.get('window').height > 695 &&
                    <>
                        <AlertComponent onClick={() => { dispatch(setCacheNav('Home')); navigation.navigate('Alert')}} fontAwesome={faBell} color="#1f7ceb" title="Listes des alertes" />
                    </>
                }
            </View>
        </View>
    );
}

export default HomeScreen;