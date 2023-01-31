import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// MODELS
import { InitialStateInterface } from 'redux/slices/socket/models';

const initialState: InitialStateInterface = {
	socket: null,
};

export const socketSlice = createSlice({
	name: 'socketState',
	initialState,
	reducers: {
		setSocket: (state, action: PayloadAction<any>) => {
			state.socket = action.payload;
		},
	},
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;
