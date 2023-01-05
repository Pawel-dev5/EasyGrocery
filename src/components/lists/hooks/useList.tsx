import React, { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Socket } from 'socket.io-client';

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
import { EditItemInterface } from 'components/lists/models/elements';

// HELPERS
import { updateObject } from 'utils/helpers/objectHelpers';
import { removeObjectFromArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { ShopDataInterface } from 'components/shops/models/hooks';

const schema = yup
	.object({
		title: yup.string().required(),
		// description: yup.string(),
	})
	.required();

export const useList = () => {
	const [backendError, setBackendError] = useState<string | null>(null);
	const [lists, setLists] = useState<ListInterface[]>([]);
	const [singleList, setSingleList] = useState<SingleListInterface | null>(null);
	const [singleListEditable, setSingleListEditable] =
		useState<SingleListEditableInitialInterface>(SingleListEditableInitial);
	const { user } = useContext(GlobalContextData);
	const [showDone, setShowDone] = useState<'done' | 'unDone' | null>(null);
	const [visible, setVisible] = useState(false);
	const [listsView, setListsView] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [newShop, setNewShop] = useState<ShopDataInterface | null>(null);
	const [sortedListItemsByCategories, setSortedListItemsByCategories] = useState<any | null>([]);

	// NEW LIST ALL VALUES EDITITED
	const [editedSingleList, setEditedSingleList] = useState<SingleListInterface | null>(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// SPECIFY QUERIES TO GET NEEDED DATA AND PROTECT REQUEST FOR BEING TOO BIG IN SIZE AND TIME
	const qs = require('qs');
	const userQuery = qs.stringify(
		{
			populate: {
				lists: {
					populate: ['items'],
				},
			},
		},
		{
			encodeValuesOnly: true,
		},
	);

	const listQuery = qs.stringify(
		{
			populate: ['items', 'shops', 'users_permissions_users'],
		},
		{
			encodeValuesOnly: true,
		},
	);

	const basePuSingleListtQuery = qs.stringify(
		{
			populate: ['items', 'users_permissions_users'],
		},
		{
			encodeValuesOnly: true,
		},
	);

	// SOCKET.IO CONFIG
	const [socket, setSocket] = useState<Socket<any, any> | null>(null);
	if (socket) {
		socket.off('listUpdate').once('listUpdate', (data: any) => {
			const { id, attributes } = data;
			if (singleList) setSingleList({ id, ...attributes });
			setIsUpdating(false);
		});
	}

	const getLists = () => {
		if (user?.id)
			axios
				.get(`users/${user?.id}?${userQuery}`)
				.then((resp) => {
					setIsLoading(false);
					setLists(resp?.data?.lists);
				})
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const getList = (id: string) => {
		if (id)
			axios
				.get(`lists/${id}?${listQuery}`)
				.then((resp) => {
					setIsLoading(false);
					setSingleList({ id: resp?.data?.data?.id, ...resp?.data?.data?.attributes });
				})
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const deleteList = (id: string) => {
		if (id)
			axios
				.delete(`lists/${id}`)
				.then((resp) => {
					// const newList: ListInterface[] = [...lists];
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
				setVisible(!visible);
				reset();
			})
			.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	// TODO
	const updateListAfterSingleChange = (toUpdate: ListInterface) => {
		console.log(toUpdate);
		if (toUpdate) {
			const newLists = updateObjectInArray(lists, 'id', toUpdate?.id, (todo: ListInterface) =>
				updateObject(todo, { ...toUpdate }),
			);
			// setLists(newLists);
			console.log(newLists);
		}
	};

	const sendSingleListPutRequest = (data: ItemInterface[] | [], query?: string, callbackOnSuccess?: () => void) => {
		const putQuery = query ? `?${query}` : '';
		if (data)
			axios
				.put(`lists/${singleList?.id}${putQuery}`, {
					data: {
						items: data,
					},
				})
				.then((resp) => {
					// SOCKET UPDATE STATES BELOW
					if (socket)
						socket.emit('listUpdate', { data: resp?.data?.data }, (error: any) => {
							if (error) alert(error);
							setSingleListEditable(SingleListEditableInitial);
						});
					if (callbackOnSuccess) callbackOnSuccess();
					const newListToUpdate = {
						id: resp.data.data?.id,
						...resp.data.data?.attributes,
					};
					updateListAfterSingleChange(newListToUpdate);
				})
				.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	const addNewSingleListItem = () => {
		if (singleList?.items) {
			const newData = [...singleList?.items, singleListEditable?.value?.newItem];
			sendSingleListPutRequest(newData as ItemInterface[], basePuSingleListtQuery, () => addNewListItem(''));
		}
	};

	const deleteSingleListItem = (id: string) => {
		if (singleList?.items) {
			const newData = removeObjectFromArray(singleList?.items, 'id', id);
			sendSingleListPutRequest(newData, basePuSingleListtQuery);
		}
	};

	const clearSingleListItems = () => {
		if (singleList?.items) sendSingleListPutRequest([]);
	};

	const updateSingleListItemStatus = (id: string) => {
		if (singleList?.items) {
			const newData = updateObjectInArray(singleList?.items, 'id', id, (todo: ItemInterface) =>
				updateObject(todo, { done: !todo?.done }),
			);
			sendSingleListPutRequest(newData, basePuSingleListtQuery);
		}
	};

	const updateSingleListItemName = (id: string, item: EditItemInterface) => {
		if (singleList?.items) {
			const newData = updateObjectInArray(singleList?.items, 'id', id, (todo: ItemInterface) =>
				updateObject(todo, { value: item?.title }),
			);
			sendSingleListPutRequest(newData, basePuSingleListtQuery);
		}
	};

	const addNewListItem = (title: ChangeEvent<HTMLInputElement> | string) => {
		const newItem = {
			id: null,
			value: title as unknown as string,
			uuid: null,
			done: false,
			category: null,
		};
		setSingleListEditable({
			isEdited: 'items',
			value: { ...singleListEditable.value, newItem },
		});
	};

	const filteredItems = useMemo(() => {
		if (singleList?.items) {
			const baseItems = [...singleList?.items];
			const filter = showDone === 'done' ?? true;
			if (baseItems && showDone !== null) return baseItems.filter(({ done }) => done === filter);
			if (showDone === null) return null;
		}
	}, [showDone]);

	const submitEditList = (data: FieldValues) => {
		if (data && editedSingleList) {
			setIsUpdating(true);
			axios
				.put(`lists/${editedSingleList?.id}`, {
					data: {
						...data,
						shop: newShop || data.shop,
					},
				})
				.then((resp) => {
					// SOCKET UPDATE STATES BELOW
					if (socket)
						socket.emit('listUpdate', { data: resp?.data?.data }, (error: any) => {
							if (error) {
								alert(error);
							}
						});
				})
				.catch((error) => console.log(error?.response?.data));
		}
	};

	const sortItemsByCategories = () => {
		const itemsToSort = singleList?.items;
		const categories = singleList?.shop?.data?.attributes?.orders;
		const newListItems: any = [];
		if (categories && categories?.length > 0 && itemsToSort && itemsToSort?.length > 0) {
			categories.forEach(({ value }) => {
				const newCategoryItems = {
					category: value,
					items: itemsToSort?.filter(({ category }) => category?.toLowerCase() === value?.toLowerCase()),
				};
				if (newCategoryItems) newListItems.push(newCategoryItems);
			});
		}
		if (newListItems?.length > 0) setSortedListItemsByCategories(newListItems);
	};

	useEffect(() => {
		if (sortedListItemsByCategories) sortItemsByCategories();
	}, [singleList]);

	return {
		lists,
		singleList,
		backendError,
		user,
		singleListEditable,
		filteredItems,
		showDone,
		visible,
		control,
		errors,
		listsView,
		isLoading,
		isUpdating,
		editedSingleList,
		newShop,
		sortedListItemsByCategories,
		addNewSingleListItem,
		deleteSingleListItem,
		clearSingleListItems,
		updateSingleListItemStatus,
		updateSingleListItemName,
		submitEditList,
		getLists,
		getList,
		deleteList,
		setNewList,
		addNewListItem,
		setShowDone,
		setVisible,
		handleSubmit,
		setIsLoading,
		setListsView,
		setEditedSingleList,
		setNewShop,
		sortItemsByCategories,
		setSortedListItemsByCategories,
		setSocket,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children }: ListContextProvider) => (
	<ListsContextData.Provider value={useList()}>{children}</ListsContextData.Provider>
);
