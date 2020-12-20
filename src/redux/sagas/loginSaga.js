import { call, put, takeEvery } from "redux-saga/effects";
import history from '../../history'

export async function loginApi(credentials) {
  return await fetch(`https://nytimes-express-backend.herokuapp.com/login`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      charset: "UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      history.push('/myprofile')
    })
    .catch((error) => {
      throw error;
    });
}

export function* fetchLogin(action) {
  try {
    const user = yield call(loginApi, action.payload.credentials);
    //doesnt return books
    yield put({ type: "LOGIN_USER_SUCCESS", user: user });
  } catch (error) {
    yield put({ type: "LOGIN_USER_ERROR", message: error.message });
  }
}

function* loginSaga() {
  yield takeEvery("LOGIN_USER", fetchLogin);
}

export default loginSaga;
