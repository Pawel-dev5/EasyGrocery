/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import axios from 'axios';

// REDUX
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectSocket } from 'redux/slices/socket';
import {
	selectNotifications,
	notificationsSetItems,
	notificationsSetItemsDelete,
	notificationsSetItemsUpdate,
} from 'redux/slices/notifications';
import { selectGlobal } from 'redux/slices/global';

// MODELS
import { NotificationInterface } from 'components/notifications/models/views';
import { User } from 'config/models';

// UTILS
import { removeObjectFromArray } from 'utils/helpers/arrayHelpers';
import { listQuery, notificationsQuery, notificatioQuery } from 'utils/queries';
import { listsSetListsAdd } from 'redux/slices/lists';

export const useNotifications = () => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);
	const user = globalState?.user;
	const socketState = useAppSelector(selectSocket);
	const notificationsState = useAppSelector(selectNotifications);
	const notifications = notificationsState?.items;

	const [filteredNotifications, setFilteredNotifications] = useState<NotificationInterface[]>([]);
	const [showAll, setShowAll] = useState(true);

	// LOADERS
	const [loadingNotifications, setLoadingNotifications] = useState(false);

	useEffect(() => {
		setFilteredNotifications(notifications);
	}, [notifications]);

	const getNotifications = async () => {
		setLoadingNotifications(true);

		axios
			.get(`notifications/?${notificationsQuery(user?.email!)}`)
			.then((resp) => dispatch(notificationsSetItems(resp?.data?.data)))
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => setLoadingNotifications(false));
	};

	const filterNotifications = () => {
		if (filteredNotifications?.length === notifications?.length) {
			setFilteredNotifications(notifications?.filter((item) => !item?.attributes?.read));
		} else setFilteredNotifications(notifications);
	};

	const updateRead = (id: number, notification: NotificationInterface, statusCallback: (arg0: boolean) => void) => {
		statusCallback(true);

		axios
			.put(`notifications/${id}?${notificatioQuery}`, {
				data: {
					...notification,
					read: !notification?.attributes?.read,
				},
			})
			.then((resp) => dispatch(notificationsSetItemsUpdate(resp?.data?.data)))
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));
	};

	const deleteNotification = (id: number, statusCallback: (arg0: boolean) => void) => {
		statusCallback(true);

		axios
			.delete(`notifications/${id}?${notificatioQuery}`)
			.then((resp) => dispatch(notificationsSetItemsDelete(resp?.data?.data)))
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));
	};

	const acceptNotification = (notification: NotificationInterface, statusCallback: (arg0: boolean) => void) => {
		statusCallback(true);

		// UPDARE NOTIFICATION SEND REQUEST STATUS
		axios
			.put(`notifications/${notification?.id}?${notificatioQuery}`, {
				data: {
					...notification,
					sendRequest: !notification?.attributes?.sendRequest,
					read: true,
				},
			})
			.then((resp) => dispatch(notificationsSetItemsUpdate(resp?.data?.data)))
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));

		// CREATE ACCEPT NOTIFICATION TO INVITATION SENDER
		axios
			.post(`notifications/?${notificatioQuery}`, {
				data: {
					type: 'accept',
					users_permissions_user: [
						{ id: notification?.attributes?.sender?.data?.id, ...notification?.attributes?.sender?.data?.attributes },
					],
					sender: [user],
					sendRequest: true,
					list: notification?.attributes?.list?.data,
				},
			})
			.then((resp) => {
				if (socketState?.socket)
					socketState?.socket.emit('notificationsUpdate', { data: resp?.data?.data }, (error: any) => {
						if (error) alert(error);
					});
			})
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));

		// UPDATE LIST ACCESS
		const newInvitations = removeObjectFromArray(
			notification?.attributes?.list?.data?.attributes?.invitations,
			'uuid',
			user?.id,
		);

		const actualUsers = () => {
			let arr: User[] = [];
			if (notification?.attributes?.list?.data?.attributes?.users_permissions_user) {
				const newUsers = notification?.attributes?.list?.data?.attributes?.users_permissions_user?.data;
				arr = [...newUsers];
			}

			if (notification?.attributes?.list?.data?.attributes?.users_permissions_users) {
				const newUsers = notification?.attributes?.list?.data?.attributes?.users_permissions_users?.data;
				arr = [...newUsers];
			}

			return arr;
		};
		axios
			.put(`lists/${notification?.attributes?.list?.data?.id}?${listQuery}`, {
				data: {
					users_permissions_users: [user, ...actualUsers()],
					invitations: newInvitations || [],
				},
			})
			.then((resp) => dispatch(listsSetListsAdd({ ...resp?.data?.data?.attributes, id: resp?.data?.data?.id })))
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));
	};

	const rejectNotification = (notification: NotificationInterface, statusCallback: (arg0: boolean) => void) => {
		statusCallback(true);

		// UPDARE NOTIFICATION SEND REQUEST STATUS
		axios
			.put(`notifications/${notification?.id}?${notificatioQuery}`, {
				data: {
					...notification,
					sendRequest: !notification?.attributes?.sendRequest,
					read: true,
				},
			})
			.then((resp) => dispatch(notificationsSetItemsUpdate(resp?.data?.data)))
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));

		// CREATE REJECT NOTIFICATION TO INVITATION SENDER
		axios
			.post(`notifications/?${notificatioQuery}`, {
				data: {
					type: 'reject',
					users_permissions_user: [
						{ id: notification?.attributes?.sender?.data?.id, ...notification?.attributes?.sender?.data?.attributes },
					],
					sender: [user],
					sendRequest: true,
					list: notification?.attributes?.list?.data,
				},
			})
			.then((resp) => {
				if (socketState?.socket)
					socketState?.socket.emit('notificationsUpdate', { data: resp?.data?.data }, (error: any) => {
						if (error) alert(error);
					});
			})
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));

		// UPDATE LIST ACCESS
		const newInvitations = removeObjectFromArray(
			notification?.attributes?.list?.data?.attributes?.invitations,
			'uuid',
			user?.id,
		);

		axios
			.put(`lists/${notification?.attributes?.list?.data?.id}?${listQuery}`, {
				data: {
					invitations: newInvitations || [],
				},
			})
			.then(() => {})
			.catch((error) => console.log(error?.response?.data?.error?.message))
			.finally(() => statusCallback(false));
	};

	return {
		notifications,
		loadingNotifications,
		showAll,
		filteredNotifications,
		setShowAll,
		filterNotifications,
		getNotifications,
		updateRead,
		acceptNotification,
		rejectNotification,
		deleteNotification,
	};
};
