import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// MODELS
import { ItemInterface, ListInterface } from 'components/lists/models/sections';
import {
	ListContextProvider,
	SingleListEditableInitial,
	SingleListEditableInitialInterface,
} from 'components/lists/models/hooks';
import { SingleListInterface } from 'components/lists/models/items';
import { removeObjectFromArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { updateObject } from 'utils/helpers/objectHelpers';

export const useList = ({ navigation }: { navigation: any }) => {
	const [backendError, setBackendError] = useState<string | null>(null);
	const [lists, setLists] = useState<ListInterface[]>([]);
	const [singleList, setSingleList] = useState<SingleListInterface | null>(null);
	const [singleListEditable, setSingleListEditable] =
		useState<SingleListEditableInitialInterface>(SingleListEditableInitial);
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
				.then((resp) => setSingleList({ id: resp?.data?.data?.id, ...resp?.data?.data?.attributes }))
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const deleteList = (id: string) => {
		if (id)
			axios
				.delete(`lists/${id}`)
				.then((resp) => {
					const newList: ListInterface[] = [...lists];
					// if (lists) newList = removeObjectFromArray(newList, 'id', resp?.data?.data?.id);
					// console.log(newList);
					// const tmp = removeObjectFromArray(newList, 'id', resp?.data?.data?.id);
					// setLists(tmp);
					setSingleList(null);
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

	const setIsEdited = (title: string | null) =>
		setSingleListEditable({ isEdited: 'title', value: { ...singleListEditable.value, title } });

	const setEditedValue = (title: string) =>
		setSingleListEditable({ ...singleListEditable, value: { ...singleListEditable.value, title } });

	const editSingleListTitle = () => {
		if (singleList)
			axios
				.put(`lists/${singleList?.id}`, {
					data: {
						title: singleListEditable.value.title,
					},
				})
				.then((resp) => {
					const { id, attributes } = resp?.data?.data;
					if (singleList) setSingleList({ id, ...attributes });
					setSingleListEditable(SingleListEditableInitial);
				})
				.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	const editSingleListItems = (variant: 'add' | 'delete' | 'update', id?: string) => {
		if (singleList) {
			let newData;
			if (variant === 'add') newData = [...singleList?.items, singleListEditable.value.newItem];
			if (variant === 'delete') newData = removeObjectFromArray(singleList.items, 'id', id);
			if (variant === 'update' && singleList?.items)
				newData = updateObjectInArray(singleList.items, 'id', id, (todo: ItemInterface) =>
					updateObject(todo, { done: !todo.done }),
				);

			if (newData)
				axios
					.put(`lists/${singleList?.id}`, {
						data: {
							items: newData,
						},
					})
					.then((resp) => {
						const { id, attributes } = resp?.data?.data;
						if (singleList) setSingleList({ id, ...attributes });
						setSingleListEditable(SingleListEditableInitial);
					})
					.catch((error) => console.log(error?.response?.data?.error?.message));
		}
	};

	const addNewListItem = (title: any) => {
		const newItem = {
			value: title,
			done: false,
		};
		setSingleListEditable({
			isEdited: 'items',
			value: { ...singleListEditable.value, newItem },
		});
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
		singleListEditable,
		setIsEdited,
		editSingleListTitle,
		editSingleListItems,
		setEditedValue,
		addNewListItem,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children, navigation }: ListContextProvider) => (
	<ListsContextData.Provider value={useList({ navigation })}>{children}</ListsContextData.Provider>
);
