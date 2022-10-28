import { useContext, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// MODELS
import { ListInterface } from 'components/lists/models/sections';

export const useList = () => {
	const [backendError, setBackendError] = useState<string | null>(null);
	const [lists, setLists] = useState<ListInterface[] | null>(null);
	const { user } = useContext(GlobalContextData);

	const getLists = () => {
		axios
			.get(`users/${user?.id}`)
			.then((resp) => {
				console.log(resp.data);
			})
			.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	// console.log(resp);
	return {
		lists,
		backendError,
		getLists,
	};
};
