import { useEffect, useState } from 'react';
import axios from 'axios';

// MODELS
import { User } from 'config/models';
import { NotificationInterface } from 'components/notifications/models/views';
import { removeObjectFromArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { updateObject } from 'utils/helpers/objectHelpers';

const qs = require('qs');

export const useNotifications = ({ user }: { user: User | null }) => {
	const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
	const [filteredNotifications, setFilteredNotifications] = useState<NotificationInterface[]>([]);
	const [showAll, setShowAll] = useState(true);

	// LOADERS
	const [loadingNotifications, setLoadingNotifications] = useState(false);

	useEffect(() => {
		setFilteredNotifications(notifications);
	}, [notifications]);

	// QUERIES
	const notificatioQuery = qs.stringify(
		{
			populate: ['list', 'sender'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	const listQuery = qs.stringify(
		{
			populate: ['items', 'users_permissions_users', 'shop.orders', 'shop.image', 'invitations'],
		},
		{
			encodeValuesOnly: true,
		},
	);

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

	const acceptNotification = (notification: NotificationInterface, statusCallback: (arg0: boolean) => void) => {
		console.log(notification);
		statusCallback(true);

		// UPDARE NOTIFICATION SEND REQUEST STATUS
		// axios
		// 	.put(`notifications/${notification?.id}?${notificatioQuery}`, {
		// 		data: {
		// 			...notification,
		// 			sendRequest: !notification?.attributes?.sendRequest,
		// 		},
		// 	})
		// 	.then((resp) => {
		// 		const newArr = updateObjectInArray(notifications, 'id', resp?.data?.data?.id, (todo: NotificationInterface[]) =>
		// 			updateObject(todo, { ...resp?.data?.data }),
		// 		);
		// 		setNotifications(newArr);
		// 		statusCallback(false);
		// 	})
		// 	.catch((error) => {
		// 		statusCallback(false);
		// 		console.log(error?.response?.data?.error?.message);
		// 	});

		// // CREATE ACCEPT NOTIFICATION TO INVITATION SENDER
		// axios
		// 	.post(`notifications/?${notificatioQuery}`, {
		// 		data: {
		// 			type: 'accept',
		// 			users_permissions_user: [
		// 				{ id: notification?.attributes?.sender?.data?.id, ...notification?.attributes?.sender?.data?.attributes },
		// 			],
		// 			sender: [user],
		// 		},
		// 	})
		// 	.then((resp) => {
		// 		console.log(resp?.data?.data);
		// 	})
		// 	.catch((error) => {
		// 		statusCallback(false);
		// 		console.log(error?.response?.data?.error?.message);
		// 	});

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
			.then((resp) => {})
			.catch((error) => {
				statusCallback(false);
				console.log(error?.response?.data?.error?.message);
			});
	};

	const getNotifications = () => {
		setLoadingNotifications(true);

		const query = qs.stringify(
			{
				// populate: ['list', 'sender'],
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
	};
};
