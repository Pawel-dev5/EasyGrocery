import { User } from 'config/models';
import { Dispatch, SetStateAction } from 'react';

export enum ListVariant {
	PREVIEW = 'Preview',
	FULL = 'Full',
}

export interface ItemInterface {
	id: string;
	uuid: string;
	value: string;
	done: boolean;
	category: string | null;
	withCategories?: boolean;
}

export interface ListInterface {
	id: string;
	users_permissions_users: User[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	title: string;
	description: string;
	items: ItemInterface[];
	variant: ListVariant;
}

export interface ListWrapperInterface {
	variant: ListVariant;
	list?: ListInterface;
	navigation: any;
	lists?: ListInterface[];
	setLists: Dispatch<SetStateAction<ListInterface[]>>;
}
