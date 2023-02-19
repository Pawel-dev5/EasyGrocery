import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

// ACTIONS
import { logoutAction } from 'redux/actions';

// MODELS
import { InitialStateInterface } from 'redux/slices/product/models';
import { ProductInterface } from 'components/shops/models/hooks';

const initialState: InitialStateInterface = {
	data: null,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		productSetProduct: (state, action: PayloadAction<ProductInterface>) => {
			state.data = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, (state) => {
			state.data = null;
		});
	},
});

export const { productSetProduct } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;
