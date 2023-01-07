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
import { FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Socket } from 'socket.io-client';

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
} from 'components/lists/models/hooks';
import { SingleListInterface } from 'components/lists/models/items';
import { EditItemInterface } from 'components/lists/models/elements';
import { User } from 'config/models';
import { ShopDataInterface } from 'components/shops/models/hooks';

// HELPERS
import { updateObject } from 'utils/helpers/objectHelpers';
import { findObjectInArray, removeObjectFromArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { useDebounce } from 'utils/helpers/useDebounce';

const schema = yup
	.object({
		title: yup.string().required(),
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
	const [listUsers, setListUsers] = useState<User[]>([]);

	// SEARCH VALUES
	const [searchUsersValue, setSearchUsersValue] = useState<string>('');
	const [searchedUsers, setSearchedUsers] = useState([]);
	const searchUsersValueDebounced = useDebounce(searchUsersValue || '', 500);

	// NEW LIST ALL VALUES EDITITED
	const [editedSingleList, setEditedSingleList] = useState<SingleListInterface | null>(null);

	// LOADERS
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
			populate: ['items', 'users_permissions_users', 'shop.orders', 'shop.image', 'invitations'],
		},
		{
			encodeValuesOnly: true,
		},
	);

	const notificationQuery = qs.stringify(
		{
			populate: {
				list: {
					populate: '*',
				},
				users_permissions_user: {
					data: {
						attributes: {
							populate: '*',
						},
					},
				},
			},
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

	// FETCHES
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
					console.log(navigation);
					if (navigation) {
						console.log('elo');
						navigation?.navigate(listRoute.lists);
					}
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
				setLists([...lists, newList]);
				setVisible(!visible);
				reset();
				setAddNewListLoader(false);
			})
			.catch((error) => {
				setAddNewListLoader(false);
				setBackendError(error?.response?.data?.error?.message);
			});
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

	const addNewSingleListItem = () => {
		setAddNewListItemLoader(true);
		if (singleList?.items) {
			const newData = [...singleList?.items, singleListEditable?.value?.newItem];
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
		if (singleList?.items) sendSingleListPutRequest([]);
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

	const filteredItems = useMemo(() => {
		if (singleList?.items) {
			const baseItems = [...singleList?.items];
			const filter = showDone === 'done' ?? true;
			if (baseItems && showDone !== null) return baseItems?.filter(({ done }) => done === filter);
			if (showDone === null) return null;
		}
	}, [showDone]);

	const submitEditList = (data: FieldValues) => {
		const newListUsers = (type?: string) => {
			const newArr: any = [];
			listUsers?.map((user) => {
				const find = findObjectInArray(editedSingleList?.users_permissions_users?.data!, 'id', user?.id);
				if (find === null) {
					const newUser = {
						uuid: user?.id,
						email: user?.email,
						username: user?.username,
					};
					if (type === 'invitations') {
						newArr.push(newUser);
					} else newArr.push(user);
				}
			});
			return newArr;
		};

		if (newListUsers()) {
			newListUsers()?.forEach((newUser: any) => {
				axios
					.post(`notifications/?${notificationQuery}`, {
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
						// SOCKET UPDATE STATES BELOW
						// if (socket)
						// 	socket.emit('listUpdate', { data: resp?.data?.data }, (error: any) => {
						// 		if (error) {
						// 			alert(error);
						// 		}
						// 	});
						console.log(user);
						console.log(resp.data.dsata);
					})
					.catch((error) => console.log(error?.response?.data));
			});
		}
		const deleteUser = () => {
			if (listUsers?.length === 0) {
				return [user];
			}
			return [editedSingleList?.users_permissions_users, ...listUsers];
		};

		if (data && editedSingleList) {
			setIsUpdating(true);
			axios
				.put(`lists/${editedSingleList?.id}?${listQuery}`, {
					data: {
						...data,
						shop: newShop || data?.shop,
						users_permission_users: deleteUser(),
						invitations: newListUsers('invitations'),
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
		addNewListItemLoader,
		addNewListLoader,
		searchedUsers,
		deleteListLoader,
		listUsers,
		setListUsers,
		setLists,
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
		setSearchIcons,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children }: ListContextProvider) => (
	<ListsContextData.Provider value={useList()}>{children}</ListsContextData.Provider>
);
