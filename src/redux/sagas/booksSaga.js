import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { nytimes } from "./nytimes";

function getBooksApi(category) {
  return fetch(
    `${nytimes.base_url}/svc/books/v3/lists/current/${category}.json?api-key=${nytimes.api_key}`
  )
    .then((response) => response.json())
    .then((data) => data["results"]["books"])
    .catch((error) => {
      throw error;
    });
}

function* fetchBooks(action) {
  try {
    const books = yield call(getBooksApi, action.payload.category);
    yield put({ type: "GET_BOOKS_SUCCESS", books: books });
  } catch (e) {
    yield put({ type: "GET_BOOKS_FAILED", message: e.message });
  }
}

function* booksSaga() {
  yield takeLatest("GET_BOOKS_REQUESTED", fetchBooks);
}

export default booksSaga;
