import { ListInterface } from 'components/lists/models/sections';

export interface ShopDataAttributes {
	attributes: {
		uuid: string;
		title: string;
		description: string;
		imageUrl?: string;
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
		prices: any;
		lists: ListInterface[];
		orders: OrderInterface[];
	};
}

export interface ShopDataInterface extends ShopDataAttributes {
	id: string;
}

interface OrderInterface {
	id: string;
	value: string;
	priority: number;
}
