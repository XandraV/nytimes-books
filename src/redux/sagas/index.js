import { all } from 'redux-saga/effects'
import booksSaga from "./booksSaga";
import loginSaga from "./loginSaga";
import usersBooksSaga from './usersBooksSaga';

export default function* rootSaga() {
  yield all([booksSaga(), loginSaga(), usersBooksSaga()]);
}
