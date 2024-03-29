import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// ACTIONS
import { logoutAction } from 'redux/actions';

// MODELS
import { InitialStateInterface } from 'redux/slices/notifications/models';
import { NotificationInterface } from 'components/notifications/models/views';

// HELPERS
import { findObjectInArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { updateObject } from 'utils/helpers/objectHelpers';

const initialState: InitialStateInterface = {
	counter: 0,
	items: [],
};

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		notificationsSetCounter: (state, action: PayloadAction<number>) => {
			state.counter = action.payload;
		},
		notificationsSetItems: (state, action: PayloadAction<NotificationInterface[]>) => {
			state.items = action.payload;
		},
		notificationsUpdateItems: (state, action: PayloadAction<NotificationInterface>) => {
			const newArr = updateObjectInArray(state.items, 'id', action.payload?.id, (todo: NotificationInterface[]) =>
				updateObject(todo, { ...action.payload }),
			);
			state.items = newArr;
		},
		notificationsDeleteItems: (state, action: PayloadAction<NotificationInterface>) => {
			const newArr = state.items?.filter((item) => item?.id !== action.payload?.id);
			state.items = newArr;
		},
		notificationsUpdateItemsSocket: (state, action: PayloadAction<any>) => {
			const checkedNotification = findObjectInArray(state?.items, 'id', action.payload?.id);
			if (!checkedNotification || checkedNotification === null || checkedNotification === undefined) {
				state.items = [action.payload, ...state.items];
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	},
});

export const {
	notificationsSetCounter,
	notificationsSetItems,
	notificationsDeleteItems,
	notificationsUpdateItems,
	notificationsUpdateItemsSocket,
} = notificationsSlice.actions;

export const selectNotifications = (state: RootState) => state.notifications;

export default notificationsSlice.reducer;
