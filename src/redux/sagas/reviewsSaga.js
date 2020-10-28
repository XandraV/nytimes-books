import { call, put, takeEvery } from "redux-saga/effects";

export function getReviewsApi(data) {
  return fetch(
    `${process.env.REACT_APP_NYTIMES_BASE_URL}/svc/books/v3/reviews.json?${data.filter}=${data.word}&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data["results"])
    .catch((error) => {
      throw error;
    });
}

export function* fetchReviews(action) {
  try {
    const reviews = yield call(getReviewsApi, action.payload);
    yield put({ type: "GET_REVIEWS_SUCCESS", reviews: reviews });
  } catch (e) {
    yield put({ type: "GET_REVIEWS_FAILED", message: e.message });
  }
}

function* reviewsSaga() {
  yield takeEvery("GET_REVIEWS_REQUESTED", fetchReviews);
}

export default reviewsSaga;