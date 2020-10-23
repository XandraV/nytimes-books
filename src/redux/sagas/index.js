import { all } from 'redux-saga/effects'
import booksSaga from "./booksSaga";
import reviewsSaga from "./reviewsSaga";

export default function* rootSaga() {
  yield all([booksSaga(), reviewsSaga()]);
}
