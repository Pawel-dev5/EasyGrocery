import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// ACTIONS
import { logoutAction } from 'redux/actions';
import { InitialStateInterface } from 'redux/slices/lists/models';

// MODELS
import { ListInterface } from 'components/lists/models/sections';
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
		listsSetListsAdd: (state, action: PayloadAction<ListInterface>) => {
			state.lists = [...state.lists, action.payload];
		},
		listsSetListsDelete: (state, action: PayloadAction<string>) => {
			const newArr = state.lists?.filter((item) => item?.id !== action.payload);
			state.lists = newArr;
			state.list = null;
		},
		listsSetListsUpdate: (state, action: PayloadAction<ListInterface>) => {
			const newArr = updateObjectInArray(state.lists, 'id', action.payload.id, (todo: ListInterface) =>
				updateObject(todo, { ...action.payload }),
			);
			state.lists = newArr;
		},
		listsSetList: (state, action: PayloadAction<SingleListInterface>) => {
			state.list = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	},
});

export const { listsSetLists, listsSetListsDelete, listsSetListsAdd, listsSetListsUpdate, listsSetList } =
	listsSlice.actions;

export const selectLists = (state: RootState) => state.lists;

export default listsSlice.reducer;
