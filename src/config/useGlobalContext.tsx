import React, { createContext, useState } from 'react';

// MODELS
import { ContextProviderProps } from 'config/models';

export const useGlobalContext = () => {
	const [lang, setLang] = useState('pl');
	const [isAuth, setIsAuth] = useState(false);

	const signIn = () => setIsAuth(true);
	const signOut = () => setIsAuth(false);

	return { lang, setLang, isAuth, setIsAuth, signIn, signOut };
};

export const GlobalContextData = createContext({} as ReturnType<typeof useGlobalContext>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<GlobalContextData.Provider value={useGlobalContext()}>{children}</GlobalContextData.Provider>
);
