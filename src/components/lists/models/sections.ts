import { User } from 'config/models';

export enum ListVariant {
	PREVIEW = 'Preview',
	FULL = 'Full',
}

export interface ItemInterface {
	id: string;
	uuid: string;
	value: string;
	done: boolean;
}

export interface ListInterface {
	id: string;
	users_permissions_users: User[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	title: string;
	descriptrion: string;
	items: ItemInterface[];
	variant: ListVariant;
}

export interface ListWrapperInterface {
	variant: ListVariant;
	list?: ListInterface;
	navigation: any;
}
