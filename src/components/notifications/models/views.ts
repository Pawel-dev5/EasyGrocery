import { InvitationUser } from 'components/lists/models/items';
import { User } from 'config/models';

export interface NotificationInterface {
	id: number;
	attributes: {
		list: {
			data: {
				id: number;
				attributes: {
					title: string;
					invitations: InvitationUser[];
					users_permissions_users: { data: User[] };
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
		type: 'invitation';
		read: boolean;
		sendRequest: boolean;
		createdAt: Date;
	};
}
