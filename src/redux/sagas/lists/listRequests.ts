import axios from 'axios';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { OrderInterface } from 'components/shops/models/hooks';

// HELPERS
import { listQuery } from 'utils/queries';
import { convertListShopAttrubites } from 'components/lists/helpers/convertListShopAttrubites';

export const updateListItems = (id: string, data: ItemInterface[]) =>
	axios
		.put(`lists/${id}?${listQuery}`, {
			data: {
				items: data,
			},
		})
		.then((resp) => convertListShopAttrubites(resp?.data?.data));

export const updateListCustomShopOrder = (id: string, data: OrderInterface[]) =>
	axios
		.put(`lists/${id}?${listQuery}`, {
			data: {
				customShopOrder: data,
			},
		})
		.then((resp) => convertListShopAttrubites(resp?.data?.data));
