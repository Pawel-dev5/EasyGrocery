import React, { createContext, useState } from 'react';

// MODELS
import { ContextProviderProps } from 'config/models';

export const useGlobalContext = () => {
	const [lang, setLang] = useState('pl');

	return { lang, setLang };
};

export const GlobalContextData = createContext({} as ReturnType<typeof useGlobalContext>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<GlobalContextData.Provider value={useGlobalContext()}>{children}</GlobalContextData.Provider>
);
