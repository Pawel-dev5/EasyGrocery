import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// MODELS
import { InitialStateInterface, LanguageTypes } from 'redux/slices/global/models';

const initialState: InitialStateInterface = {
	token: null,
	user: null,
	lang: 'pl',
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
	},
});

export const { globalSetAuthToken, globalSetLang } = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;
