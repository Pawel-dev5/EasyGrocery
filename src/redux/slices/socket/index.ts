import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// ACTIONS
import { logoutAction } from 'redux/actions';

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
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	},
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;
