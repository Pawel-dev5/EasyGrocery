import { useEffect, useState } from 'react';
import axios from 'axios';

// MODELS
import { NotificationInterface } from 'components/notifications/models/views';
import { UseNotificationInterface } from 'components/notifications/models/hooks';

// UTILS
import { removeObjectFromArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { updateObject } from 'utils/helpers/objectHelpers';
import { listQuery, notificatioQuery } from 'utils/queries';

const qs = require('qs');

export const useNotifications = ({
	user,
	addNewListFromNofitication,
	notifications,
	setNotifications,
}: UseNotificationInterface) => {
	const [filteredNotifications, setFilteredNotifications] = useState<NotificationInterface[]>([]);
	const [showAll, setShowAll] = useState(true);

	// LOADERS
	const [loadingNotifications, setLoadingNotifications] = useState(false);

	useEffect(() => {
		setFilteredNotifications(notifications);
	}, [notifications]);

	const getNotifications = () => {
		setLoadingNotifications(true);

		const query = qs.stringify(
			{
				populate: {
					list: {
						populate: ['invitations', 'users_permissions_users'],
					},
					sender: {
						populate: '*',
					},
				},
				filters: {
					users_permissions_user: {
						email: {
							$eq: user?.email,
						},
					},
				},
				sort: ['createdAt:desc'],
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);

		axios
			.get(`notifications/?${query}`)
			.then((resp) => {
				setNotifications(resp?.data?.data);
				setLoadingNotifications(false);
			})
			.catch((error) => {
				setLoadingNotifications(false);
				console.log(error?.response?.data?.error?.message);
			});
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
			.then((resp) => {
				const newArr = updateObjectInArray(notifications, 'id', resp?.data?.data?.id, (todo: NotificationInterface[]) =>
					updateObject(todo, { ...resp?.data?.data }),
				);
				setNotifications(newArr);
				statusCallback(false);
			})
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});
	};

	const deleteNotification = (id: number, statusCallback: (arg0: boolean) => void) => {
		statusCallback(true);

		axios
			.delete(`notifications/${id}?${notificatioQuery}`)
			.then((resp) => {
				const newArr = notifications?.filter((item) => item?.id !== resp?.data?.data?.id);
				setNotifications(newArr);
			})
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});
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
			.then((resp) => {
				const newArr = updateObjectInArray(notifications, 'id', resp?.data?.data?.id, (todo: NotificationInterface[]) =>
					updateObject(todo, { ...resp?.data?.data }),
				);
				setNotifications(newArr);
				statusCallback(false);
			})
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});

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
			.then(() => statusCallback(false))
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});

		// UPDATE LIST ACCESS
		const newInvitations = removeObjectFromArray(
			notification?.attributes?.list?.data?.attributes?.invitations,
			'uuid',
			user?.id,
		);
		axios
			.put(`lists/${notification?.attributes?.list?.data?.id}?${listQuery}`, {
				data: {
					users_permissions_users: [
						user,
						...notification?.attributes?.list?.data?.attributes?.users_permissions_users?.data,
					],
					invitations: newInvitations ? newInvitations : [],
				},
			})
			.then((resp) => {
				addNewListFromNofitication({ ...resp?.data?.data?.attributes, id: resp?.data?.data?.id });
				statusCallback(false);
			})
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});
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
			.then((resp) => {
				const newArr = updateObjectInArray(notifications, 'id', resp?.data?.data?.id, (todo: NotificationInterface[]) =>
					updateObject(todo, { ...resp?.data?.data }),
				);
				setNotifications(newArr);
				statusCallback(false);
			})
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});

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
			.then(() => statusCallback(false))
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});

		// UPDATE LIST ACCESS
		const newInvitations = removeObjectFromArray(
			notification?.attributes?.list?.data?.attributes?.invitations,
			'uuid',
			user?.id,
		);
		axios
			.put(`lists/${notification?.attributes?.list?.data?.id}?${listQuery}`, {
				data: {
					invitations: newInvitations ? newInvitations : [],
				},
			})
			.then((resp) => statusCallback(false))
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});
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
