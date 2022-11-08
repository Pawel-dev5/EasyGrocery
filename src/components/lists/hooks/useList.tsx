import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Manager, Socket } from 'socket.io-client';
import { REACT_APP_API } from '@env';

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

	// SOCKET.IO CONFIG
	const [socket, setSocket] = useState<Socket<any, any> | null>(null);
	if (socket) {
		socket.off('listUpdate').once('listUpdate', (data: any) => {
			const { id, attributes } = data;
			if (singleList) setSingleList({ id, ...attributes });
			setIsUpdating(false);
		});
	}
	useEffect(() => {
		const manager = new Manager(REACT_APP_API, {
			reconnectionDelayMax: 10000,
		});
		const socket = manager.socket('/');
		setSocket(socket);
	}, []);

	const getLists = () => {
		if (user?.id)
			axios
				.get(`users/${user?.id}`)
				.then((resp) => {
					setIsLoading(false);
					setLists(resp.data.lists);
				})
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const getList = (id: string) => {
		if (id)
			axios
				.get(`lists/${id}`)
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

	const editSingleListItems = (
		variant: 'add' | 'delete' | 'updateDone' | 'clear' | 'updateItem',
		id?: string,
		item?: any,
	) => {
		if (singleList?.items) {
			let newData;
			if (variant === 'add') newData = [...singleList?.items, singleListEditable.value.newItem];
			if (variant === 'delete' && id) newData = removeObjectFromArray(singleList.items, 'id', id);
			if (variant === 'updateDone' && id)
				newData = updateObjectInArray(singleList.items, 'id', id, (todo: ItemInterface) =>
					updateObject(todo, { done: !todo.done }),
				);
			if (variant === 'updateItem' && id && item)
				newData = updateObjectInArray(singleList.items, 'id', id, (todo: ItemInterface) =>
					updateObject(todo, { value: item.title, category: item.category }),
				);
			if (variant === 'clear') newData = [];

			if (newData)
				axios
					.put(`lists/${singleList?.id}`, {
						data: {
							items: newData,
						},
					})
					.then((resp) => {
						// SOCKET UPDATE STATES BELOW
						if (socket)
							socket.emit('listUpdate', { data: resp?.data?.data }, (error: any) => {
								if (error) {
									alert(error);
								}
								setSingleListEditable(SingleListEditableInitial);
							});
					})
					.catch((error) => console.log(error?.response?.data?.error?.message));
		}
	};

	const handleKeyboardItems = (nativeEvent: any) => {
		console.log(nativeEvent);
		if (nativeEvent?.key === 'Enter') editSingleListItems('add');
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
		const categories = singleList?.shop.data?.attributes?.orders;
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
		submitEditList,
		getLists,
		getList,
		deleteList,
		setNewList,
		editSingleListItems,
		addNewListItem,
		setShowDone,
		handleKeyboardItems,
		setVisible,
		handleSubmit,
		setIsLoading,
		setListsView,
		editedSingleList,
		setEditedSingleList,
		setNewShop,
		newShop,
		sortItemsByCategories,
		sortedListItemsByCategories,
		setSortedListItemsByCategories,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children }: ListContextProvider) => (
	<ListsContextData.Provider value={useList()}>{children}</ListsContextData.Provider>
);
