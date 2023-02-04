import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// ACTIONS
import { logoutAction } from 'redux/actions';
import { InitialStateInterface } from 'redux/slices/shops/models';
import { ShopDataInterface } from 'components/shops/models/hooks';

// MODELS

const initialState: InitialStateInterface = {
	shops: [],
	shop: null,
};

export const shopsSlice = createSlice({
	name: 'shops',
	initialState,
	reducers: {
		shopsSetshops: (state, action: PayloadAction<ShopDataInterface[]>) => {
			state.shops = action.payload;
		},
		shopsSetshop: (state, action: PayloadAction<ShopDataInterface>) => {
			state.shop = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	},
});

export const { shopsSetshops, shopsSetshop } = shopsSlice.actions;

export const selectShops = (state: RootState) => state.shops;

export default shopsSlice.reducer;
