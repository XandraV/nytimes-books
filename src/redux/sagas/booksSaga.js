import { call, put, takeEvery } from "redux-saga/effects";

export async function getBooksApi(category) {
  return await fetch(
    `${process.env.REACT_APP_NYTIMES_BASE_URL}/svc/books/v3/lists/current/${category}.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data["results"]["books"])
    .catch((error) => {
      throw error;
    });
}

export function* fetchBooks(action) {
  try {
    const books = yield call(getBooksApi, action.payload.category);
    yield put({ type: "GET_BOOKS_SUCCESS", books: books });
  } catch (e) {
    yield put({ type: "GET_BOOKS_FAILED", message: e.message });
  }
}

function* booksSaga() {
  yield takeEvery("GET_BOOKS_REQUESTED", fetchBooks);
}

export default booksSaga;