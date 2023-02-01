import { all } from 'redux-saga/effects';

import watcherLists from 'redux/sagas/lists/listHandlers';

export default function* rootSaga() {
	yield all([watcherLists()]);
}
