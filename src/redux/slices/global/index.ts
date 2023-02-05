import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// ACTIONS
import { logoutAction } from 'redux/actions';

// MODELS
import { AlertsInterface, InitialStateInterface, LanguageTypes } from 'redux/slices/global/models';

const initialState: InitialStateInterface = {
	token: null,
	user: null,
	lang: 'pl',
	alerts: [],
	menuRoute: 1,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		globalSetAuthToken: (state, action: PayloadAction<InitialStateInterface>) => {
			const { jwt, user } = action.payload;
			state.token = jwt;
			state.user = user;
		},
		globalSetLang: (state, action: PayloadAction<LanguageTypes>) => {
			state.lang = action.payload;
		},
		globalSetAlert: (state, action: PayloadAction<AlertsInterface>) => {
			if (state.alerts) {
				state.alerts = [...state.alerts, action.payload];
			} else {
				state.alerts = [action.payload];
			}
		},
		globalDeleteAlert: (state, action: PayloadAction<string>) => {
			if (state.alerts) {
				const newArr = [...state.alerts]?.filter((item) => item?.id !== action.payload);
				state.alerts = newArr;
			}
		},
		globalSetMenuRoute: (state, action: PayloadAction<number>) => {
			state.menuRoute = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, (state) => {
			state.token = null;
			state.user = null;
		});
	},
});

export const { globalSetAuthToken, globalSetLang, globalSetAlert, globalDeleteAlert, globalSetMenuRoute } =
	globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;
