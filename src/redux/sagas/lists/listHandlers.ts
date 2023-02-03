import type { RootState } from 'redux/store';
import { v4 as uuidv4 } from 'uuid';

// EFFECTS
import { call, put, select, takeLatest } from 'redux-saga/effects';

// REDUX
import { globalSetAlert } from 'redux/slices/global';
import { listsUpdateListStatus, listsDeleteListItem } from 'redux/slices/lists';

// REQUESTS
import { updateListItems } from 'redux/sagas/lists/listRequests';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { SingleListInterface } from 'components/lists/models/items';
import { AlertTypes } from 'redux/slices/global/models';
import { SocketErrorInterface } from 'config/models';

// STORE
const getListIdState = (state: RootState) => state.lists?.list?.id;
const getListItemsState = (state: RootState) => state.lists?.list?.items;
const getSocketState = (state: RootState) => state.socket;

function* handleListFlow() {
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
export default function* watcherLists() {
	yield takeLatest(listsUpdateListStatus, handleListFlow);
	yield takeLatest(listsDeleteListItem, handleListFlow);
}
