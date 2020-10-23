import { cloneableGenerator } from "@redux-saga/testing-utils";
import { takeEvery } from "redux-saga/effects";
import reviewsSaga, { fetchReviews } from "./reviewsSaga";
import { GET_REVIEWS_REQUESTED } from "../reducers/types";

describe("Reviews sagas", () => {
  describe("Default reviews saga", () => {
    const generator = cloneableGenerator(reviewsSaga)();

    test("listens for every GET_REVIEWS_REQUESTED action", () => {
      expect(generator.next().value).toEqual(
        takeEvery(GET_REVIEWS_REQUESTED, fetchReviews)
      );
    });
  });
});
