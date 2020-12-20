import { call, put, takeEvery } from "redux-saga/effects";

export async function usersBooksApi(token) {
  return await fetch(`https://nytimes-express-backend.herokuapp.com/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      charset: "UTF-8",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((books) => books)
    .catch((error) => {
      throw error;
    })
}

export function* fetchUsersBooks(action) {
  try {
    const books = yield call(usersBooksApi, action.payload.token);
    yield put({ type: "GET_USERS_BOOKS_SUCCESS", books: books });
  } catch (error) {
    yield put({ type: "GET_USERS_BOOKS_ERROR", message: error.message });
  }
}

function* usersBooksSaga() {
  yield takeEvery("GET_USERS_BOOKS_REQUESTED", fetchUsersBooks);
}

export default usersBooksSaga;
