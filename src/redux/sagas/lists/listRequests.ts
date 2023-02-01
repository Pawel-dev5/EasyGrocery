import axios from 'axios';
import { ItemInterface } from 'components/lists/models/sections';
import { listQuery } from 'utils/queries';

export const updateListItems = (id: string, data: ItemInterface[]) =>
	axios
		.put(`lists/${id}?${listQuery}`, {
			data: {
				items: data,
			},
		})
		.then((resp) => ({
			id: resp.data.data?.id,
			...resp.data.data?.attributes,
		}));
