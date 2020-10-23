import { call, put, takeEvery } from "redux-saga/effects";
import { nytimes } from "./nytimes";

function getReviewsApi(data) {
  return fetch(
    `https://api.nytimes.com/svc/books/v3/reviews.json?${data.filter}=${data.word}&api-key=EPQfG6lAOJgoKSMq58JMRxSHooAQynA4`
  )
    .then((response) => response.json())
    .then((data) => data["results"])
    .catch((error) => {
      throw error;
    });
}

function* fetchReviews(action) {
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
