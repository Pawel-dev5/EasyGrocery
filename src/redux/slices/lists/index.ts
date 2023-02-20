import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// ACTIONS
import { logoutAction } from 'redux/actions';
import { InitialStateInterface } from 'redux/slices/lists/models';

// MODELS
import { ItemInterface, ListInterface } from 'components/lists/models/sections';
import { SingleListInterface } from 'components/lists/models/items';

// HELPERS
import { updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { updateObject } from 'utils/helpers/objectHelpers';

const initialState: InitialStateInterface = {
	lists: [],
	list: null,
};

export const listsSlice = createSlice({
	name: 'lists',
	initialState,
	reducers: {
		listsSetLists: (state, action: PayloadAction<ListInterface[]>) => {
			state.lists = action.payload;
		},
		listsAddLists: (state, action: PayloadAction<ListInterface>) => {
			state.lists = [...state.lists, action.payload];
		},
		listsDeleteLists: (state, action: PayloadAction<string>) => {
			const newArr = state.lists?.filter((item) => item?.id !== action.payload);
			state.lists = newArr;
			state.list = null;
		},
		listsUpdateLists: (state, action: PayloadAction<ListInterface>) => {
			const newArr = updateObjectInArray(state.lists, 'id', action.payload.id, (todo: ListInterface) =>
				updateObject(todo, { ...action.payload }),
			);
			state.lists = newArr;
		},
		listsSetList: (state, action: PayloadAction<SingleListInterface | null>) => {
			state.list = action.payload;
		},

		// SAGA HANDLERS
		listsUpdateListStatus: (state, action: PayloadAction<string>) => {
			if (state?.list) {
				const newData = updateObjectInArray(state?.list.items, 'id', action.payload, (todo: ItemInterface) =>
					updateObject(todo, { done: !todo?.done }),
				);
				state.list = { ...state.list, items: newData };
			}
		},
		listsDeleteListItem: (state, action: PayloadAction<string>) => {
			if (state?.list) {
				const newData = state?.list?.items?.filter((item) => item?.id !== action.payload);
				state.list = { ...state.list, items: newData };
			}
		},
		listsUpdateDnDListItem: (state, action: PayloadAction<ItemInterface[]>) => {
			if (state?.list) {
				state.list = { ...state.list, items: action.payload };
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	},
});

export const {
	listsSetLists,
	listsDeleteLists,
	listsAddLists,
	listsUpdateLists,
	listsSetList,
	listsUpdateListStatus,
	listsDeleteListItem,
	listsUpdateDnDListItem,
} = listsSlice.actions;

export const selectLists = (state: RootState) => state.lists;

export default listsSlice.reducer;
