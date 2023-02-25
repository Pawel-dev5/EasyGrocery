import { ListInterface } from 'components/lists/models/sections';

export interface ShopDataAttributes {
	id: string;
	uuid: string;
	title: string;
	description: string;
	imageUrl?: string;
	apiUrl: string;
	image: {
		id: string;
		alternativeText: string;
		url: string;
	};
	prices: PriceInterface[];
	lists: ListInterface[];
	orders: OrderInterface[];
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
	id: number;
	value: string;
	priority: number;
}

export interface ProductInterface {
	id: string;
	category: string;
	createdAt: string;
	description: string;
	imageUrl: string;
	title: string;
	updatedAt: string;
	prices: PriceInterface[];
}

export interface AddProductInterface {
	list: ListInterface;
	product: ProductInterface | null;
	callbackOnSuccess?: () => void;
}
