import { cloneableGenerator } from "@redux-saga/testing-utils";
import { takeEvery } from "redux-saga/effects";
import booksSaga, { fetchBooks } from "./booksSaga";
import { GET_BOOKS_REQUESTED } from "../reducers/types";

describe("Books sagas", () => {
  describe("Default books saga", () => {
    const generator = cloneableGenerator(booksSaga)();

    test("listens for every GET_BOOKS_REQUESTED action", () => {
      expect(generator.next().value).toEqual(
        takeEvery(GET_BOOKS_REQUESTED, fetchBooks)
      );
    });
  });
});
