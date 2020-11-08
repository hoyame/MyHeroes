import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import I18n from '../../i18n/i18n';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch } from 'react-redux';
import HeaderComponent from '../../components/Header/header';
import { setCacheShowAlert } from '../../data/actions/user';
import { useReduxState } from '../../data/store';

const AlertScreen = ({ navigation }) => {
    const screenWidth = Math.round(Dimensions.get('window').width - 70);
    const alerts = useReduxState(state => state.alerts.list);

    interface IAlert {
        id?: number;
        level: number;
        source: string;
        latitude: number;
        longitude: number;
        description: string;
        onClick: any;
    }

    const AlertProps: React.FC<IAlert> = (props: IAlert) => {
        let color = "#ffd100";
        let levelName = I18n.t("alertFaible");

        switch (props.level) {
            case 1: 
                color = "#ffd100";
                levelName = I18n.t("alertFaible");
                break;
            case 2: 
                color = "#ff9600";
                levelName = I18n.t("alertMoyen");
                break;
            case 3:
                color = "#d80000";
                levelName = I18n.t("alertGrave");
                break;
        }

        return (
            <TouchableOpacity
                onPress={props.onClick}
            >
                <View style={{
                    height: 70,
                    width: screenWidth - 8,
                    backgroundColor: '#e1e1e1',
                    borderRadius: 7.5,
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 7.5
                }}>
                    <View style={{
                        height: 55,
                        width: 55,
                        margin: 7.5, 
                        borderRadius: 50,
                        opacity: 0.60,
                    }}>
                        <FontAwesomeIcon icon={faExclamationCircle} size={35} style={{
                          margin: 10,
                          color: color
                        }}></FontAwesomeIcon>
                    </View>

                    <View style={{
                        backgroundColor: 'transparent',

                    }}>   
                        <Text style={{
                            fontSize: 20,
                            marginTop: 10,
                            marginLeft: 10,
                            color: "#000000"
                        }}>{I18n.t("alertT")} {levelName}</Text>

                        <Text style={{
                            fontSize: 15,
                            marginTop: 5,
                            marginLeft: 10,
                            color: "#94958B"
                        }}>{I18n.t("par")} {props.source}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const dispatch = useDispatch();

    const returnAlerts = (nav: any) => {
        return alerts.map((v, k) => {
            return <AlertProps key={k} {...v} onClick={() => {
                dispatch(setCacheShowAlert(v))
                nav.navigate('AlertPageScreen')
            }} />
        })
    }

    if (alerts.length == 0) {
        return (
            <>
                <HeaderComponent title={I18n.t("alertes")} navigation={navigation} />

                <View style={{
                    paddingLeft: 35,
                    paddingRight: 35,
                    paddingBottom: 35
                }}>
                    <View style={{
                        height: 60,
                        marginBottom: 15,
                        borderRadius: 8,
                        padding: 10,
                        justifyContent: "center",
                        backgroundColor: "#0077be"
                    }}>
                        <Text style={{
                            textAlign: "center",
                            color: "#fff",
                            fontSize: 20      
                        }}>{I18n.t("alertNotDispo")}</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            height: 60, 
                            width: screenWidth,
                            borderRadius: 7.5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#1d1d1d'           
                        }}>
                              <Text style={{
                                fontSize: 20,
                                color: '#ffffff'
                            }}>{I18n.t("alertReturnAcceuil")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    
    return (
        <>
            <HeaderComponent title={I18n.t("alertes")} navigation={navigation} />

            <View style={{
                paddingLeft: 35,
                paddingRight: 35,
                paddingBottom: 35
            }}>
                <ScrollView>
                    {returnAlerts(navigation)}
                </ScrollView>
            </View>
        </>
    );
}

export default AlertScreen;