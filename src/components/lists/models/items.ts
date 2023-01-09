import { Dispatch, SetStateAction } from 'react';

// MODELS
import { User } from 'config/models';
import { ItemInterface, ListInterface } from 'components/lists/models/sections';
import { ShopDataInterface } from 'components/shops/models/hooks';

export interface InvitationUser {
	uuid: number;
	username: string;
	email: string;
}

export interface SingleListInterface {
	id: string | null;
	users_permissions_users: { data: User[] };
	createdAt: string | null;
	updatedAt: string | null;
	publishedAt: string | null;
	title: string | null;
	description: string | null;
	items: ItemInterface[];
	color: string | null;
	shop: {
		data: ShopDataInterface;
	};
	invitations: InvitationUser[];
}

export interface FullListInterface {
	actualList: ListInterface[];
	setLists: Dispatch<SetStateAction<ListInterface[]>>;
}
