import { InvitationUser } from 'components/lists/models/items';
import { ItemInterface, ListVariant } from 'components/lists/models/sections';
import { User } from 'config/models';

export interface NotificationInterface {
	id: number;
	attributes: {
		list: {
			data: {
				id: string;
				attributes: {
					title: string;
					invitations: InvitationUser[];
					users_permissions_user: { data: User[] };
					users_permissions_users: { data: User[] };
					id: string;
					createdAt: string;
					updatedAt: string;
					publishedAt: string;

					description: string;
					items: ItemInterface[];
					variant: ListVariant;
				};
			};
		};
		sender: {
			data: {
				id: number;
				attributes: {
					email: string;
					username: string;
				};
			};
		};
		type: 'invitation' | 'accept' | 'reject';
		read: boolean;
		sendRequest: boolean;
		createdAt: Date;
	};
}
