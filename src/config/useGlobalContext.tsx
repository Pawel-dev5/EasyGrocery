import React, { createContext, useState } from 'react';

// MODELS
import { ContextProviderProps, UserDataInterface } from 'config/models';

const InitialUserData: UserDataInterface = {
	jwt: null,
	user: null,
};

export const useGlobalContext = () => {
	const [lang, setLang] = useState('pl');
	const [isAuth, setIsAuth] = useState(false);
	const [userData, setUserData] = useState<UserDataInterface>(InitialUserData);

	const signIn = (data: UserDataInterface) => {
		setUserData({ ...data });
		setIsAuth(true);
	};

	const signOut = () => {
		setUserData(InitialUserData);
		setIsAuth(false);
	};

	return { lang, isAuth, userData, signIn, signOut, setLang };
};

export const GlobalContextData = createContext({} as ReturnType<typeof useGlobalContext>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<GlobalContextData.Provider value={useGlobalContext()}>{children}</GlobalContextData.Provider>
);
