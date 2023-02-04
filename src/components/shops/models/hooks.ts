import { ListInterface } from 'components/lists/models/sections';

export interface ShopDataInterface {
	id: string;
	attributes: {
		uuid: string;
		title: string;
		description: string;
		imageUrl: string | undefined;
		apiUrl: string;
		image: {
			data: {
				id: string;
				attributes: {
					alternativeText: string;
					url: string;
				};
			};
		};
		lists: ListInterface[];
		orders: OrderInterface[];
	};
}

interface OrderInterface {
	id: string;
	value: string;
	priority: number;
}
