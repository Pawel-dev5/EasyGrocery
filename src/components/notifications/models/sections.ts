import { NotificationInterface } from 'components/notifications/models/views';

export interface NotificationComponentInterface {
	item: NotificationInterface;
	updateRead: (id: number, notification: NotificationInterface, statusCallback: (arg0: boolean) => void) => void;
	acceptNotification: (notification: NotificationInterface, statusCallback: (arg0: boolean) => void) => void;
}
