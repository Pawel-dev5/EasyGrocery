/* eslint-disable no-alert */
import React, {
	ChangeEvent,
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// MODELS
import { ItemInterface, ListInterface } from 'components/lists/models/sections';
import {
	ListContextProvider,
	SingleListEditableInitial,
	SingleListEditableInitialInterface,
	UseListInterface,
} from 'components/lists/models/hooks';
import { SingleListInterface } from 'components/lists/models/items';
import { EditItemInterface } from 'components/lists/models/elements';
import { User } from 'config/models';
import { ShopDataInterface } from 'components/shops/models/hooks';

// HELPERS
import { updateObject } from 'utils/helpers/objectHelpers';
import { findObjectInArray, removeObjectFromArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { useDebounce } from 'utils/helpers/useDebounce';
import { listQuery, listNotificationQuery } from 'utils/queries';

const qs = require('qs');

const schema = yup
	.object({
		title: yup.string().required(),
	})
	.required();

export const useList = ({ lists, setLists, socket, setSocket }: UseListInterface) => {
	const { user } = useContext(GlobalContextData);

	const [backendError, setBackendError] = useState<string | null>(null);
	const [singleList, setSingleList] = useState<SingleListInterface | null>(null);
	const [singleListEditable, setSingleListEditable] =
		useState<SingleListEditableInitialInterface>(SingleListEditableInitial);
	const [showDone, setShowDone] = useState<'done' | 'unDone' | null>(null);
	const [visible, setVisible] = useState(false);
	const [listsView, setListsView] = useState(true);
	const [newShop, setNewShop] = useState<ShopDataInterface | null>(null);
	const [sortedListItemsByCategories, setSortedListItemsByCategories] = useState<any | null>([]);
	const [listUsers, setListUsers] = useState<User[]>([]);

	// SEARCH VALUES
	const [searchUsersValue, setSearchUsersValue] = useState<string>('');
	const [searchedUsers, setSearchedUsers] = useState([]);
	const searchUsersValueDebounced = useDebounce(searchUsersValue || '', 500);

	// NEW LIST ALL VALUES EDITITED
	const [editedSingleList, setEditedSingleList] = useState<SingleListInterface | null>(null);

	// LOADERS
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [addNewListItemLoader, setAddNewListItemLoader] = useState(false);
	const [addNewListLoader, setAddNewListLoader] = useState(false);
	const [deleteListLoader, setDeleteListLoader] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// SOCKET.IO CONFIG
	if (socket) {
		socket.off('listUpdate').once('listUpdate', (data: any) => {
			const { id, attributes } = data;
			// UPDATE SINGLE LIST
			if (singleList) setSingleList({ id, ...attributes });
			setIsUpdating(false);
			setEditedSingleList(null);

			// UPDATE LISTS
			if (lists) {
				const newLists = updateObjectInArray(lists, 'id', id, (todo: ListInterface) =>
					updateObject(todo, { id, ...attributes }),
				);
				if (newLists && setLists) setLists(newLists);
			}
		});
	}

	// SEARCH USERS ON EDIT FORM
	const setSearchIcons = (value: string) => setSearchUsersValue(value);

	useEffect(() => {
		if (searchUsersValue !== '') {
			const searchQuery = qs.stringify(
				{
					filters: {
						username: {
							$contains: searchUsersValue,
							$ne: user?.username,
						},
					},
				},
				{
					encodeValuesOnly: true,
				},
			);

			axios
				.get(`users/?${searchQuery}`)
				.then((resp) => setSearchedUsers(resp?.data))
				.catch((error) => setBackendError(error?.response?.data?.error?.message));
		} else setSearchedUsers([]);
	}, [searchUsersValueDebounced]);

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

	const deleteList = (
		id: string,
		actualist: ListInterface[],
		setActualList: Dispatch<SetStateAction<ListInterface[]>>,
		navigation?: any,
	) => {
		if (id) {
			setDeleteListLoader(true);
			axios
				.delete(`lists/${id}`)
				.then((resp) => {
					let newList: ListInterface[] = [];
					if (actualist && actualist?.length > 0) newList = removeObjectFromArray(actualist, 'id', resp?.data?.data?.id);
					// RESET LISTS
					setActualList([]);
					// SET UPDATED LISTS
					setActualList(newList);
					// RESET SINGLE LIST
					setSingleList(null);
					setDeleteListLoader(false);

					// DONT WORK DONT KNOW WHY
					if (navigation) navigation?.navigate(listRoute.lists);
				})
				.catch((error) => {
					setDeleteListLoader(false);
					setBackendError(error?.response?.data?.error?.message);
				});
		}
	};

	const setNewList = (data: FieldValues) => {
		setAddNewListLoader(true);

		axios
			.post(`lists/?${listQuery}`, {
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
				if (lists && setLists) setLists([...lists, newList]);
				setVisible(!visible);
				reset();
				setAddNewListLoader(false);
			})
			.catch((error) => {
				setAddNewListLoader(false);
				setBackendError(error?.response?.data?.error?.message);
			});
	};

	const addNewListFromNofitication = (list: ListInterface) => {
		if (lists && setLists) setLists([...lists, list]);
	};

	// TODO
	const updateListAfterSingleChange = (toUpdate: ListInterface) => {
		if (toUpdate && lists && setLists) {
			const newLists = updateObjectInArray(lists, 'id', toUpdate?.id, (todo: ListInterface) =>
				updateObject(todo, { ...toUpdate }),
			);
			setLists(newLists);
		}
	};

	// UPDATING LIST
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
				.catch((error) => {
					if (callbackOnSuccess) callbackOnSuccess();
					console.log(error?.response?.data?.error?.message);
				});
	};

	const addNewListItem = (title: ChangeEvent<HTMLInputElement> | string) => {
		const newItem = {
			value: title as string,
			done: false,
		};
		setSingleListEditable({
			isEdited: 'items',
			value: { ...singleListEditable.value, newItem },
		});
	};

	const addNewSingleListItem = () => {
		setAddNewListItemLoader(true);
		if (singleList?.items) {
			const newItems = singleList?.items;
			const newData = [...newItems, singleListEditable?.value?.newItem];
			sendSingleListPutRequest(newData as ItemInterface[], listQuery, () => {
				addNewListItem('');
				setAddNewListItemLoader(false);
			});
		}
	};

	const deleteSingleListItem = (id: string, callback: () => void) => {
		if (singleList?.items) {
			const newData = removeObjectFromArray(singleList?.items, 'id', id);
			sendSingleListPutRequest(newData, listQuery, callback);
		}
	};

	const clearSingleListItems = () => {
		const callback = () => {
			setSortedListItemsByCategories([]);
		};
		if (singleList?.items) {
			sendSingleListPutRequest([], listQuery, callback);
		}
	};

	const updateSingleListItemStatus = (id: string, callback: () => void) => {
		if (singleList?.items) {
			const newData = updateObjectInArray(singleList?.items, 'id', id, (todo: ItemInterface) =>
				updateObject(todo, { done: !todo?.done }),
			);
			sendSingleListPutRequest(newData, listQuery, callback);
		}
	};

	const updateSingleListItemName = (id: string, item: EditItemInterface, callback: () => void) => {
		if (singleList?.items) {
			const newData = updateObjectInArray(singleList?.items, 'id', id, (todo: ItemInterface) =>
				updateObject(todo, { value: item?.title, category: item?.category }),
			);
			sendSingleListPutRequest(newData, listQuery, callback);
		}
	};

	const filteredItems = useMemo(() => {
		if (singleList?.items) {
			const newItems = singleList?.items;
			const baseItems = [...newItems];
			const filter = showDone === 'done' ?? true;
			if (baseItems && showDone !== null) return baseItems?.filter(({ done }) => done === filter);
			if (showDone === null) return null;
		}
		return null;
	}, [showDone]);

	const deleteUnAccessUser = () => {
		const newArr = listUsers?.filter((item) => item?.access === 'FULL');
		return [...newArr, user];
	};

	const submitEditList = (data: FieldValues) => {
		const newListUsers = (type?: string) => {
			const newArr: any = [];
			listUsers?.map((listUser) => {
				const find = findObjectInArray(editedSingleList?.users_permissions_users?.data!, 'id', listUser?.id);
				if (find === null) {
					const newUser = {
						uuid: listUser?.id,
						email: listUser?.email,
						username: listUser?.username,
					};
					if (type === 'invitations') {
						newArr.push(newUser);
					} else newArr.push(listUser);
				}
				return null;
			});
			return newArr;
		};

		if (newListUsers()) {
			newListUsers()?.forEach((newUser: User) => {
				const find = findObjectInArray(editedSingleList?.invitations!, 'email', newUser?.email);

				if (find === null)
					axios
						.post(`notifications/?${listNotificationQuery}`, {
							data: {
								type: 'invitation',
								list: {
									id: singleList?.id,
									attributes: {
										...singleList,
									},
								},
								users_permissions_user: [newUser],
								sender: [user],
							},
						})
						.then((resp) => {
							if (socket)
								socket.emit('notificationsUpdate', { data: resp?.data?.data }, (error: any) => {
									if (error) alert(error);
								});
						})
						.catch((error) => console.log(error?.response?.data));
			});
		}

		if (data && editedSingleList) {
			setIsUpdating(true);

			axios
				.put(`lists/${editedSingleList?.id}?${listQuery}`, {
					data: {
						...data,
						shop: newShop || data?.shop,
						invitations: newListUsers('invitations'),
						users_permission_users: deleteUnAccessUser(),
					},
				})
				.then((resp) => {
					// SOCKET UPDATE STATES BELOW
					if (socket)
						socket.emit('listUpdate', { data: resp?.data?.data }, (error: any) => {
							if (error) alert(error);
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
		singleList,
		isLoading,
		backendError,
		user,
		singleListEditable,
		filteredItems,
		showDone,
		visible,
		control,
		errors,
		listsView,
		isUpdating,
		editedSingleList,
		newShop,
		sortedListItemsByCategories,
		addNewListItemLoader,
		addNewListLoader,
		searchedUsers,
		deleteListLoader,
		listUsers,
		setListUsers,
		addNewSingleListItem,
		deleteSingleListItem,
		clearSingleListItems,
		updateSingleListItemStatus,
		updateSingleListItemName,
		submitEditList,
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
		setSearchIcons,
		addNewListFromNofitication,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children, lists, setLists, socket, setSocket }: ListContextProvider) => (
	<ListsContextData.Provider value={useList({ lists, setLists, socket, setSocket })}>{children}</ListsContextData.Provider>
);
