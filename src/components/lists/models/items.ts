import { User } from 'config/models';
import { ItemInterface } from 'components/lists/models/sections';

export interface SingleListInterface {
	id: string | null;
	users_permissions_users: { data: User[] };
	createdAt: string | null;
	updatedAt: string | null;
	publishedAt: string | null;
	title: string | null;
	descriptrion: string | null;
	items: ItemInterface[];
}
