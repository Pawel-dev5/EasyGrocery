import axios from 'axios';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';

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
