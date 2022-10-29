import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

// CONTEXT
import { ContextProviderProps, UserDataInterface, User } from 'config/models';

const InitialUserData: UserDataInterface = {
	jwt: null,
	user: null,
};

const getValueFor = async (key: string) => {
	const result = await SecureStore.getItemAsync(key);
	if (result) return result;

	return null;
};

export const useGlobalContext = () => {
	const [lang, setLang] = useState('pl');
	const [isAuth, setIsAuth] = useState(false);
	const [userData, setUserData] = useState<UserDataInterface>(InitialUserData);

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
	};

	const setUser = (user: User) => setUserData({ ...userData, user });

	if (userData?.jwt) axios.defaults.headers.common['Authorization'] = `Bearer ${userData.jwt}`;

	// AUTORIZATION HANDLER
	// useEffect(() => {
	// 	const checkAuth = async () => {
	// 		const cachedToken = await getValueFor('token');

	// 		if (cachedToken) {
	// 			setIsAuth(true);

	// 			if (!userData.jwt) setUserData({ ...userData, jwt: cachedToken });
	// 		} else setIsAuth(false);
	// 	};
	// 	checkAuth();
	// }, [userData.jwt]);

	return {
		lang,
		isAuth,
		user: userData.user,
		signIn,
		signOut,
		setLang,
		setUser,
	};
};

export const GlobalContextData = createContext({} as ReturnType<typeof useGlobalContext>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<GlobalContextData.Provider value={useGlobalContext()}>{children}</GlobalContextData.Provider>
);
