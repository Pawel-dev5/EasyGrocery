import { ListInterface } from 'components/lists/models/sections';

export interface ShopDataAttributes {
	id: string;
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
		prices: PriceInterface[];
		lists: ListInterface[];
		orders: OrderInterface[];
	};
}

export interface PriceInterface {
	id?: number;
	price: string;
	date: string;
	promotion: string;
	promotionDescription: string;
}

export interface ShopDataInterface extends ShopDataAttributes {
	id: string;
}

export interface OrderInterface {
	id: string;
	value: string;
	priority: number;
}

export interface AddProductInterface {
	list: ListInterface;
	product: ShopDataInterface | null;
	callbackOnSuccess?: () => void;
}
