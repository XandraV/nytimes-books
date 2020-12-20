import { all } from 'redux-saga/effects'
import booksSaga from "./booksSaga";

export default function* rootSaga() {
  yield all([booksSaga()]);
}
