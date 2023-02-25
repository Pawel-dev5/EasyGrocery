import type { RootState } from 'redux/store';
import { v4 as uuidv4 } from 'uuid';

// EFFECTS
import { call, put, select, takeLatest } from 'redux-saga/effects';

// REDUX
import { globalSetAlert } from 'redux/slices/global';
import {
	listsUpdateListStatus,
	listsDeleteListItem,
	listsUpdateDnDListItem,
	listsUpdateDnDListcustomShopOrder,
} from 'redux/slices/lists';

// REQUESTS
import { updateListItems, updateListCustomShopOrder } from 'redux/sagas/lists/listRequests';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { SingleListInterface } from 'components/lists/models/items';
import { AlertTypes } from 'redux/slices/global/models';
import { OrderInterface } from 'components/shops/models/hooks';
import { SocketErrorInterface } from 'config/models';

// STORE
const getListIdState = (state: RootState) => state.lists?.list?.id;
const getListItemsState = (state: RootState) => state.lists?.list?.items;
const getListCustomShopOrderState = (state: RootState) => state.lists?.list?.customShopOrder;
const getSocketState = (state: RootState) => state.socket;

function* handleListItemsFlow() {
	try {
		// ---> 1. GET LIST ID, ITEMS AND SOCKET <---
		const id: string = yield select(getListIdState);
		const items: ItemInterface[] = yield select(getListItemsState);
		const socketState: { socket: { emit: any } } = yield select(getSocketState);

		// ---> 2. GET LIST DATA <---
		const listData: SingleListInterface = yield call(updateListItems, id, items);

		// ---> 4. SET LIST DATA <---
		// SOCKET UPDATE STATES
		if (socketState?.socket)
			socketState?.socket.emit(
				'listUpdate',
				{
					data: listData,
				},
				(error: SocketErrorInterface) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name });
					}
				},
			);
	} catch (err) {
		if (err)
			yield put(
				globalSetAlert({
					id: uuidv4(),
					type: AlertTypes.ERROR,
					message: 'List items update error',
					status: '',
					name: 'SAGA:',
				}),
			);
	}
}

function* handleListCustomShopOrderFlow() {
	try {
		// ---> 1. GET LIST ID, ITEMS AND SOCKET <---
		const id: string = yield select(getListIdState);
		const customShopOrder: OrderInterface[] = yield select(getListCustomShopOrderState);
		const socketState: { socket: { emit: any } } = yield select(getSocketState);

		// ---> 2. GET LIST DATA <---
		const listData: SingleListInterface = yield call(updateListCustomShopOrder, id, customShopOrder);

		// ---> 4. SET LIST DATA <---
		// SOCKET UPDATE STATES
		if (socketState?.socket)
			socketState?.socket.emit(
				'listUpdate',
				{
					data: listData,
				},
				(error: SocketErrorInterface) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name });
					}
				},
			);
	} catch (err) {
		if (err)
			yield put(
				globalSetAlert({
					id: uuidv4(),
					type: AlertTypes.ERROR,
					message: 'List items update error',
					status: '',
					name: 'SAGA:',
				}),
			);
	}
}

export default function* watcherLists() {
	yield takeLatest(listsUpdateListStatus, handleListItemsFlow);
	yield takeLatest(listsDeleteListItem, handleListItemsFlow);
	yield takeLatest(listsUpdateDnDListItem, handleListItemsFlow);
	yield takeLatest(listsUpdateDnDListcustomShopOrder, handleListCustomShopOrderFlow);
}
