import { ADD_ALERT, GET_ALERTS, UPDATE_ALERTS, IAlert } from "../types/alerts";
import { SET_TEMP_LANGAGE, SET_TEMP_LANGAGE_STATUS } from "../types/user";

interface IAddAlert {
	type: typeof ADD_ALERT;
	payload: IAlert;
}

export const addAlert = (data: IAlert) => ({
	type: ADD_ALERT,
	payload: data,
});

interface IGetAlert {
	type: typeof GET_ALERTS;
	payload: IAlert;
}

export const getAlert = (data: boolean) => ({
	type: GET_ALERTS,
	payload: data,
});

interface IUpdateAlert {
	type: typeof UPDATE_ALERTS;
	payload: IAlert;
}

export const updateAlert = (data: IAlert) => ({
	type: UPDATE_ALERTS,
	payload: data,
});

export type IAlertsAction = IAddAlert | IGetAlert | IUpdateAlert;
