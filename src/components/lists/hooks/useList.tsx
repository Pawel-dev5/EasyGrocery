import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// MODELS
import { ListInterface } from 'components/lists/models/sections';
import { removeObjectFromArray } from 'utils/helpers/arrayHelpers';
import { ListContextProvider } from 'components/lists/models/hooks';
import { SingleListInterface } from 'components/lists/models/items';

export const useList = ({ navigation }: { navigation: any }) => {
	const [backendError, setBackendError] = useState<string | null>(null);
	const [lists, setLists] = useState<ListInterface[]>([]);
	const [singleList, setSingleList] = useState<SingleListInterface | null>(null);

	const { user } = useContext(GlobalContextData);

	const getLists = () => {
		if (user?.id)
			axios
				.get(`users/${user?.id}`)
				.then((resp) => setLists(resp.data.lists))
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const getList = (id: string) => {
		if (id)
			axios
				.get(`lists/${id}`)
				.then((resp) => setSingleList(resp?.data?.data))
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const deleteList = (id: string) => {
		if (id)
			axios
				.delete(`lists/${id}`)
				.then(() => {
					// let newList: ListInterface[] = [];
					// if (lists) newList = removeObjectFromArray(lists, 'id', resp?.data?.data?.id);
					// console.log(newList);
					// setLists(newList);
					// setSingleList(null);
					// TMP
					getLists();
				})
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const setNewList = (data: FieldValues) => {
		axios
			.post(`lists`, {
				data: {
					...data,
					items: [],
					uuid: uuidv4(),
					users_permissions_users: [user],
				},
			})
			.then((resp) => {
				const newList = {
					id: resp?.data?.data?.id,
					...resp?.data?.data?.attributes,
				};
				setLists([...lists, newList]);
			})
			.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	return {
		lists,
		singleList,
		backendError,
		getLists,
		getList,
		deleteList,
		setNewList,
		user,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children, navigation }: ListContextProvider) => (
	<ListsContextData.Provider value={useList({ navigation })}>{children}</ListsContextData.Provider>
);
