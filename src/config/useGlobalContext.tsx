import React, { createContext, useState } from 'react';
import axios from 'axios';

// REDUX
import { selectGlobal } from 'redux/slices/global';
import { useAppSelector } from 'redux/hooks';

// CONTEXT
import { ContextProviderProps } from 'config/models';

// MODELS
import { ListInterface } from 'components/lists/models/sections';

// UTILS
import { userQuery } from 'utils/queries';

export const useGlobalContext = () => {
	const globalState = useAppSelector(selectGlobal);

	const [lists, setLists] = useState<ListInterface[]>([]);

	// LOADERS
	const [listIsLoading, setListIsLoading] = useState(false);

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

	return {
		listIsLoading,
		lists,
		updateListOrder,
		getLists,
		setLists,
		setListIsLoading,
	};
};

export const GlobalContextData = createContext({} as ReturnType<typeof useGlobalContext>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<GlobalContextData.Provider value={useGlobalContext()}>{children}</GlobalContextData.Provider>
);
