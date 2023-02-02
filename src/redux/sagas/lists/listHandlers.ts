import type { RootState } from 'redux/store';

// EFFECTS
import { call, select, takeLatest } from 'redux-saga/effects';

// REDUX
import { listsUpdateListStatus } from 'redux/slices/lists';

// REQUESTS
import { updateListItems } from 'redux/sagas/lists/listRequests';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { SingleListInterface } from 'components/lists/models/items';

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

		// yield put(listsSetList(listData));
		// SOCKET UPDATE STATES BELOW
		if (socketState?.socket)
			socketState?.socket.emit(
				'listUpdate',
				{
					data: listData,
				},
				(error: any) => {
					// eslint-disable-next-line no-alert
					if (error) alert(error);
				},
			);
	} catch (err) {
		// TO DO GLOBAL ERROR
		// yield put(eventSetError(true));
		// yield put(eventSetSlug(''));
	}
}

export default function* watcherLists() {
	yield takeLatest(listsUpdateListStatus, handleListFlow);
}
