import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Socket } from 'socket.io-client';

// CONTEXT
import { ContextProviderProps, UserDataInterface, User } from 'config/models';

// MODELS
import { ListInterface } from 'components/lists/models/sections';
import { NotificationInterface } from 'components/notifications/models/views';

// UTILS
import { userQuery } from 'utils/queries';

const qs = require('qs');

const InitialUserData: UserDataInterface = {
	jwt: null,
	user: null,
};

export const useGlobalContext = () => {
	const [lang, setLang] = useState('pl');
	const [isAuth, setIsAuth] = useState(false);
	const [userData, setUserData] = useState<UserDataInterface>(InitialUserData);
	const [lists, setLists] = useState<ListInterface[]>([]);
	const [notificationsCounter, setNotificationsCounter] = useState<number>(0);
	const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
	const [socket, setSocket] = useState<Socket<any, any> | null>(null);

	// LOADERS
	const [listIsLoading, setListIsLoading] = useState(false);

	const filterUnRead = (data: NotificationInterface[]) => {
		const unReadNotifications = data?.filter((item: NotificationInterface) => !item?.attributes?.read);
		return unReadNotifications?.length;
	};

	useEffect(() => setNotificationsCounter(filterUnRead(notifications)), [notifications]);

	const getLists = () => {
		setListIsLoading(true);
		if (userData?.user?.id)
			axios
				.get(`users/${userData?.user?.id}?${userQuery}`)
				.then((resp) => {
					setListIsLoading(false);
					setLists(resp?.data?.lists);
				})
				.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	const getNotificationsCounter = () => {
		const query = qs.stringify(
			{
				filters: {
					users_permissions_user: {
						email: {
							$eq: userData?.user?.email,
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

	const signIn = (data: UserDataInterface) => {
		if (data?.jwt)
			SecureStore.setItemAsync('token', data?.jwt).then(() => {
				setUserData({ ...data });
				setIsAuth(true);
			});
	};

	const signOut = () => {
		if (userData?.jwt)
			SecureStore.deleteItemAsync('token').then(() => {
				setUserData(InitialUserData);
				setIsAuth(false);
			});
		AsyncStorage.removeItem('userPassword');
		AsyncStorage.removeItem('userEmail');
	};

	const setUser = (user: User) => setUserData({ ...userData, user });

	const userQuery2 = qs.stringify({
		populate: {
			lists: {
				populate: '*',
			},
		},
	});

	const updateListOrder = (data: ListInterface[]) => {
		if (userData?.user?.id)
			axios
				.put(`users/${userData?.user?.id}/?${userQuery2}`, { ...userData?.user, lists: data })
				.then(() => {})
				.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	if (userData?.jwt) axios.defaults.headers.common.Authorization = `Bearer ${userData?.jwt}`;

	return {
		lang,
		isAuth,
		user: userData?.user,
		notifications,
		listIsLoading,
		notificationsCounter,
		lists,
		socket,
		setSocket,
		updateListOrder,
		signIn,
		signOut,
		setLang,
		setUser,
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
