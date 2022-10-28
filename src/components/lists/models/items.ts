import { User } from 'config/models';
import { ItemInterface } from 'components/lists/models/sections';

export interface SingleListInterface {
	id: string;
	attributes: {
		users_permissions_users: { data: User[] };
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		title: string;
		descriptrion: string;
		items: ItemInterface[];
	};
}
