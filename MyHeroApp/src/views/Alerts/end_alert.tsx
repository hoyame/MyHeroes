import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyHeroAlerts, { AlertsDataUsers } from "../../api/Alerts";
import Users from "../../api/User";
import { API_LINK } from "../../App";
import HeaderComponent from "../../components/Header/header";
import RateComponent from "../../components/Rate";
import { useReduxState } from "../../data/store";
import I18n from "../../i18n/i18n";

const EndAlertScreen = ({ navigation }) => {
	const mailSource = useReduxState(state => state.user.mail);
	const nameSource = useReduxState(state => state.user.name);
	const enddLvl = useReduxState(state => state.user.createAlertLevel);

	const [s, SS] = useState(false);
	const [description, setDescription] = useState("");
	const [rate, setRate] = useState(0);
	const [data, setData] = useState([]);
	const [cache, setCache] = useState("");
	const [load, setLoad] = useState(false);

	const sendXp = (user: string, xp: number) => {
		var params = {
			user: user,
			xp: xp,
		};

		fetch(`${API_LINK}/user/add_xp`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		});
	};

	useEffect(() => {
		console.log(12333324532525);
		AlertsDataUsers.map((v, k) => {
			if (enddLvl == 1) {
				sendXp(v[0], 10);
			} else if (enddLvl == 2) {
				sendXp(v[0], 20);
			} else if (enddLvl == 3) {
				sendXp(v[0], 50);
			}
		});

		if (AlertsDataUsers !== []) {
			setData(AlertsDataUsers);
		}
	}, []);

	if (load == true) {
		return (
			<>
				<HeaderComponent title={I18n.t("alertMy")} navigation={navigation} />

				<View
					style={{
						padding: 35,
						paddingTop: 0,
						marginBottom: 180,
					}}>
					<ScrollView>
						<Text
							style={{
								marginBottom: 30,
								fontSize: 25,
							}}>
							Chargement de votre hero....
						</Text>
					</ScrollView>
				</View>
			</>
		);
	}

	const returnUsers = () => {
		return data.map((v, k) => {
			return (
				<TouchableOpacity
					key={k}
					onPress={() => {
						setCache(v[0]);
						SS(true);
					}}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							height: 80,
							backgroundColor: "#ffffff",
							borderRadius: 15,
							marginBottom: 10,
							alignItems: "center",
							padding: 10,
						}}>
						<View
							style={{
								borderRadius: 15,
								marginRight: 15,
								height: 60,
								width: 60,
							}}>
							<Image
								key={Date.now()}
								style={{
									height: 60,
									width: 60,
									borderRadius: 50,
								}}
								source={{
									uri: `http://176.31.230.112:3000/api/avatar/${v[1]
										.toLowerCase()
										.replace(/^"(.+(?="$))"$/, "$1")}?time=${new Date()}`,
								}}
							/>
						</View>

						<Text
							style={{
								fontSize: 25,
							}}>
							{v[0]}
						</Text>
					</View>
				</TouchableOpacity>
			);
		});
	};

	if (s == true) {
		return (
			<>
				<HeaderComponent title={I18n.t("alertMy")} navigation={navigation} />

				<View
					style={{
						padding: 35,
						paddingTop: 0,
					}}>
					<View
						style={{
							height: 60,
							marginBottom: 15,
							borderRadius: 15,
							padding: 10,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#0077be",
						}}>
						<Text
							style={{
								width: 250,
								textAlign: "center",
								color: "#fff",
								fontSize: 15,
							}}>
							{I18n.t("alertThanks")}
						</Text>
					</View>

					<View>
						<RateComponent
							title={I18n.t("alertAvisHero")}
							placeholder={I18n.t("alertDescHero")}
							onClick={() => {
								Users.AddRate(mailSource, nameSource, cache, description, rate, () => {});
								navigation.navigate("Home");
							}}
							rate={rate}
							setRate={setRate}
							description={description}
							setDescription={setDescription}
						/>
					</View>
				</View>
			</>
		);
	}

	return (
		<>
			<HeaderComponent title={I18n.t("alertMy")} navigation={navigation} />

			<View
				style={{
					padding: 35,
					paddingTop: 0,
					marginBottom: 180,
				}}>
				<ScrollView>
					<Text
						style={{
							marginBottom: 30,
							fontSize: 25,
						}}>
						{I18n.t("accountAvisSel1")}
					</Text>

					{returnUsers()}
				</ScrollView>
			</View>
		</>
	);
};

export default EndAlertScreen;
