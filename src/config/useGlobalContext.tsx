import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// REDUX
import { selectGlobal } from 'redux/slices/global';
import { useAppSelector } from 'redux/hooks';

// CONTEXT
import { ContextProviderProps } from 'config/models';

// MODELS
import { ListInterface } from 'components/lists/models/sections';
import { NotificationInterface } from 'components/notifications/models/views';

// UTILS
import { userQuery } from 'utils/queries';

const qs = require('qs');

export const useGlobalContext = () => {
	const globalState = useAppSelector(selectGlobal);

	const [lists, setLists] = useState<ListInterface[]>([]);
	const [notificationsCounter, setNotificationsCounter] = useState<number>(0);
	const [notifications, setNotifications] = useState<NotificationInterface[]>([]);

	// LOADERS
	const [listIsLoading, setListIsLoading] = useState(false);

	const filterUnRead = (data: NotificationInterface[]) => {
		const unReadNotifications = data?.filter((item: NotificationInterface) => !item?.attributes?.read);
		return unReadNotifications?.length;
	};

	useEffect(() => setNotificationsCounter(filterUnRead(notifications)), [notifications]);

	const getLists = () => {
		setListIsLoading(true);
		if (globalState?.user?.id)
			axios
				.get(`users/${globalState?.user?.id}?${userQuery}`)
				.then((resp) => {
					setListIsLoading(false);
					setLists(resp?.data?.lists);
				})
				.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	const updateListOrder = (data: ListInterface[]) => {
		if (globalState?.user?.id)
			axios
				.put(`users/${globalState?.user?.id}/?${userQuery}`, { ...globalState?.user, lists: data })
				.then(() => {})
				.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	const getNotificationsCounter = () => {
		const query = qs.stringify(
			{
				filters: {
					users_permissions_user: {
						email: {
							$eq: globalState?.user?.email,
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
			.then((resp) => setNotificationsCounter(filterUnRead(resp?.data?.data)))
			.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	return {
		notifications,
		listIsLoading,
		notificationsCounter,
		lists,
		updateListOrder,
		getLists,
		setLists,
		setListIsLoading,
		setNotificationsCounter,
		getNotificationsCounter,
		setNotifications,
	};
};

export const GlobalContextData = createContext({} as ReturnType<typeof useGlobalContext>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<GlobalContextData.Provider value={useGlobalContext()}>{children}</GlobalContextData.Provider>
);
