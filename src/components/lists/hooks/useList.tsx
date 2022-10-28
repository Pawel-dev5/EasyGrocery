import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// MODELS
import { ListInterface } from 'components/lists/models/sections';
import { ContextProviderProps } from 'config/models';
import { SingleListInterface } from 'components/lists/models/items';

export const useList = () => {
	const [backendError, setBackendError] = useState<string | null>(null);
	const [lists, setLists] = useState<ListInterface[] | null>(null);
	const [singleList, setSingleList] = useState<SingleListInterface | null>(null);
	const { user } = useContext(GlobalContextData);

	const getLists = () => {
		axios
			.get(`users/${user?.id}`)
			.then((resp) => {
				setLists(resp.data.lists);
			})
			.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const getList = () => {
		axios
			.get(`lists/${user?.id}`)
			.then((resp) => {
				setSingleList(resp.data.data);
			})
			.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	return {
		lists,
		singleList,
		backendError,
		getLists,
		getList,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<ListsContextData.Provider value={useList()}>{children}</ListsContextData.Provider>
);
