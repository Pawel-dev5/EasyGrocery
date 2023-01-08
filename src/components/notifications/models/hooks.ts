import { Dispatch, SetStateAction } from 'react';

// COMPONENTS
import { ListInterface } from 'components/lists/models/sections';

// MODELS
import { User } from 'config/models';
import { NotificationInterface } from 'components/notifications/models/views';

export interface UseNotificationInterface {
	user: User | null;
	addNewListFromNofitication: (arg0: ListInterface) => void;
	notifications: NotificationInterface[];
	setNotifications: Dispatch<SetStateAction<NotificationInterface[]>>;
}
