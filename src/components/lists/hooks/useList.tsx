import React, { createContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// REDUX
import { selectSocket } from 'redux/slices/socket';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { globalSetAlert, selectGlobal } from 'redux/slices/global';
import {
	listsSetList,
	listsSetLists,
	listsAddLists,
	listsDeleteLists,
	listsUpdateLists,
	listsUpdateListStatus,
	selectLists,
	listsDeleteListItem,
	listsUpdateDnDListItem,
	listsUpdateDnDListcustomShopOrder,
} from 'redux/slices/lists';

// MODELS
import { ItemInterface, ListInterface } from 'components/lists/models/sections';
import { SingleListInterface } from 'components/lists/models/items';
import { EditItemInterface } from 'components/lists/models/elements';
import { ContextProviderProps, SocketErrorInterface, User } from 'config/models';
import { ShopDataInterface } from 'components/shops/models/hooks';
import { AlertTypes } from 'redux/slices/global/models';
import { UpdateCustomOrderInterface } from 'components/lists/models/hooks';

// HELPERS
import { updateObject } from 'utils/helpers/objectHelpers';
import { findObjectInArray, updateObjectInArray } from 'utils/helpers/arrayHelpers';
import { useDebounce } from 'utils/helpers/useDebounce';
import { listQuery, listNotificationQuery, searchUserQuery, userQuery } from 'utils/queries';
import { convertListShopAttrubites } from 'components/lists/helpers/convertListShopAttrubites';
import { categoriesHandler } from 'components/shops/helpers/categoriesHandler';
import { DataListInterface, ExpandListDataInterface } from 'components/layout/common/expandableListView/models/views';

const schema = yup
	.object({
		title: yup.string().required(),
	})
	.required();

export const useList = () => {
	// REDUX
	const dispatch = useAppDispatch();
	const socketState = useAppSelector(selectSocket);
	const globalState = useAppSelector(selectGlobal);
	const listsState = useAppSelector(selectLists);
	const user = globalState?.user;
	const singleList = listsState?.list;

	// SEARCH VALUES
	const [searchUsersValue, setSearchUsersValue] = useState<string>('');
	const [searchedUsers, setSearchedUsers] = useState([]);
	const searchUsersValueDebounced = useDebounce(searchUsersValue || '', 500);

	// NEW LIST ALL VALUES EDITITED
	const [editedSingleList, setEditedSingleList] = useState<SingleListInterface | null>(null);
	const [listUsers, setListUsers] = useState<User[]>([]);
	const [newShop, setNewShop] = useState<ShopDataInterface | null>(null);
	const [sortedListItemsByCategories, setSortedListItemsByCategories] = useState<any | null>([]);

	// LOADERS
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [addNewListItemLoader, setAddNewListItemLoader] = useState(false);
	const [addNewListLoader, setAddNewListLoader] = useState(false);
	const [deleteListLoader, setDeleteListLoader] = useState(false);
	const [listIsLoading, setListIsLoading] = useState(false);

	// STATES
	const [showDone, setShowDone] = useState<'done' | 'unDone' | null>(null);
	const [visible, setVisible] = useState(false);
	const [listsView, setListsView] = useState(true);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// SOCKET.IO CONFIG
	if (socketState?.socket) {
		socketState?.socket.off('listUpdate').once('listUpdate', (data: any) => {
			// UPDATE SINGLE LIST
			if (singleList) dispatch(listsSetList(data));

			// UPDATE LISTS
			dispatch(listsUpdateLists(data));
			setEditedSingleList(null);
			setIsUpdating(false);
		});
	}

	// SEARCH USERS ON EDIT FORM
	const setSearchIcons = (value: string) => setSearchUsersValue(value);

	useEffect(() => {
		if (searchUsersValue !== '') {
			axios
				.get(`users/?${searchUserQuery(user?.username!, searchUsersValueDebounced)}`)
				.then((resp) => setSearchedUsers(resp?.data))
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, name, status } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				});
		} else setSearchedUsers([]);
	}, [searchUsersValueDebounced]);

	const getLists = () => {
		setListIsLoading(true);
		if (globalState?.user?.id)
			axios
				.get(`users/${globalState?.user?.id}?${userQuery}`)
				.then((resp) => dispatch(listsSetLists(resp?.data?.lists)))
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, name, status } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				})
				.finally(() => setListIsLoading(false));
	};

	const updateListOrder = (data: ListInterface[]) => {
		if (globalState?.user?.id) {
			dispatch(listsSetLists(data));
			axios
				.put(`users/${globalState?.user?.id}/?${userQuery}`, { ...globalState?.user, lists: data })
				.then(() => {})
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				});
		}
	};

	const getList = (id: string) => {
		if (id) {
			setSortedListItemsByCategories(null);

			axios
				.get(`lists/${id}?${listQuery}`)
				.then((resp) => dispatch(listsSetList(convertListShopAttrubites(resp?.data?.data))))
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				})
				.finally(() => setIsLoading(false));
		}
	};

	const deleteList = (id: string, callback?: () => void) => {
		if (id) {
			setDeleteListLoader(true);
			axios
				.delete(`lists/${id}`)
				.then((resp) => dispatch(listsDeleteLists(resp?.data?.data?.id)))
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				})
				.finally(() => {
					setDeleteListLoader(false);
					if (callback) callback();
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
				dispatch(listsAddLists(newList));
				setVisible(!visible);
				reset();
			})
			.catch((error) => {
				if (error?.response?.data?.error) {
					const { message, status, name } = error.response.data.error;
					dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
				}
			})
			.finally(() => setAddNewListLoader(false));
	};

	// UPDATING LIST
	const sendSingleListPutRequest = (data: ItemInterface[] | [], callbackOnSuccess?: () => void) => {
		if (data)
			axios
				.put(`lists/${singleList?.id}?${listQuery}`, {
					data: {
						items: data,
					},
				})
				.then((resp) => {
					// SOCKET UPDATE STATES BELOW
					if (socketState?.socket)
						socketState?.socket.emit(
							'listUpdate',
							{
								data: convertListShopAttrubites(resp?.data?.data),
							},
							(error: SocketErrorInterface) => {
								if (error?.response?.data?.error) {
									const { message, status, name } = error.response.data.error;
									dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
								}
							},
						);
				})
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				})
				.finally(() => {
					if (callbackOnSuccess) callbackOnSuccess();
				});
	};

	const addSingleListItem = (title: string, callback: () => void) => {
		setAddNewListItemLoader(true);
		if (singleList?.items) {
			const newItem = {
				title,
				done: false,
			};

			const newData = [...singleList.items, newItem];
			sendSingleListPutRequest(newData as ItemInterface[], () => {
				setAddNewListItemLoader(false);
				callback();
			});
		}
	};

	const clearSingleListItems = () => {
		if (singleList?.items && singleList?.items?.length > 0)
			sendSingleListPutRequest([], () => setSortedListItemsByCategories([]));
	};

	const itemsDnDUpdate = (newItems: ItemInterface[]) => {
		if (singleList?.items) dispatch(listsUpdateDnDListItem(newItems));
	};

	const deleteSingleListItem = (id: string) => {
		if (singleList?.items) dispatch(listsDeleteListItem(id));
	};

	const updateSingleListItemStatus = (id: string) => {
		if (singleList?.items) dispatch(listsUpdateListStatus(id));
	};

	const updateListShopOrders = (data: ExpandListDataInterface[]) => {
		if (data && data?.length > 0) {
			const convertedToShopOrderBaseData: UpdateCustomOrderInterface[] = [];
			data?.forEach(({ category, priority }) => convertedToShopOrderBaseData.push({ value: category, priority }));

			if (convertedToShopOrderBaseData?.length > 0)
				dispatch(listsUpdateDnDListcustomShopOrder(convertedToShopOrderBaseData));
		}
	};

	const updateSingleListItemName = (id: string, item: EditItemInterface, callback: () => void) => {
		if (singleList?.items) {
			const newData = updateObjectInArray(singleList?.items, 'id', id, (todo: ItemInterface) =>
				updateObject(todo, { title: item?.title, category: item?.category }),
			);
			sendSingleListPutRequest(newData, callback);
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
	}, [showDone, singleList?.items]);

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
							if (socketState?.socket)
								socketState?.socket.emit(
									'notificationsUpdate',
									{ data: resp?.data?.data },
									(error: SocketErrorInterface) => {
										if (error?.response?.data?.error) {
											const { message, status, name } = error.response.data.error;
											dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
										}
									},
								);
						})
						.catch((error) => {
							if (error?.response?.data?.error) {
								const { message, status, name } = error.response.data.error;
								dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
							}
						});
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
					// SOCKET UPDATE STATES
					if (socketState?.socket)
						socketState?.socket.emit(
							'listUpdate',
							{
								data: convertListShopAttrubites(resp?.data?.data),
							},
							(error: SocketErrorInterface) => {
								if (error?.response?.data?.error) {
									const { message, status, name } = error.response.data.error;
									dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
								}
							},
						);
				})
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				})
				.finally(() => setIsUpdating(false));
		}
	};

	const sortItemsByCategories = () => {
		const itemsToSort = filteredItems || singleList?.items;

		let categories = singleList?.shop.orders as UpdateCustomOrderInterface[];
		if (singleList && singleList?.customShopOrder?.length > 0) {
			categories = singleList?.customShopOrder;
		}
		const newListItems: DataListInterface[] = [];

		if (categories && categories?.length > 0 && itemsToSort && itemsToSort?.length > 0) {
			categories.forEach(({ id, value, priority }) => {
				const parentCategoryItems = itemsToSort?.filter(({ category }) => category?.toLowerCase() === value?.toLowerCase());
				const childCategoryItems: ItemInterface[] = [];

				categoriesHandler(value)?.forEach((childCat) => {
					const newItems = itemsToSort?.filter(({ category }) => category?.toLowerCase() === childCat?.toLowerCase());
					if (newItems) childCategoryItems?.push(...newItems);
				});

				const newCategoryItems = {
					id,
					priority,
					category: value,
					childCategories: categoriesHandler(value),
					items: childCategoryItems?.length > 1 ? [...parentCategoryItems, ...childCategoryItems] : parentCategoryItems,
				};
				if (newCategoryItems) {
					newListItems.push(newCategoryItems);
				}
			});
		}

		if (newListItems?.length > 0) setSortedListItemsByCategories(newListItems);
	};

	useEffect(() => {
		if (
			singleList?.shop?.orders &&
			singleList?.shop?.orders?.length > 0 &&
			singleList?.items &&
			singleList?.items?.length > 0 &&
			sortedListItemsByCategories?.length > 0
		)
			sortItemsByCategories();
	}, [singleList?.items, singleList?.customShopOrder, filteredItems]);

	return {
		singleList,
		isLoading,
		user,
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
		listIsLoading,
		updateListOrder,
		getLists,
		setListUsers,
		addSingleListItem,
		deleteSingleListItem,
		itemsDnDUpdate,
		clearSingleListItems,
		updateSingleListItemStatus,
		updateSingleListItemName,
		submitEditList,
		getList,
		deleteList,
		setNewList,
		setShowDone,
		setVisible,
		handleSubmit,
		setIsLoading,
		setListsView,
		setEditedSingleList,
		setNewShop,
		sortItemsByCategories,
		setSortedListItemsByCategories,
		setSearchIcons,
		updateListShopOrders,
	};
};

export const ListsContextData = createContext({} as ReturnType<typeof useList>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<ListsContextData.Provider value={useList()}>{children}</ListsContextData.Provider>
);
