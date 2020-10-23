import books from "./books";
import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUESTED,
  GET_BOOKS_FAILED,
} from "./types";

describe("books reducer", () => {
  it("should return the initial state", () => {
    expect(books(undefined, {})).toEqual({
      books: [],
      loading: false,
      error: null,
    });
  });

  it("should handle GET_BOOKS_REQUESTED", () => {
    expect(
      books(
        {
          books: [],
          loading: false,
          error: null,
        },
        {
          type: GET_BOOKS_REQUESTED,
        }
      )
    ).toEqual({
      books: [],
      loading: true,
      error: null,
    });
  });

  it("should handle GET_BOOKS_SUCCESS", () => {
    expect(
      books(
        {
          books: [],
          loading: false,
          error: null,
        },
        {
          type: GET_BOOKS_SUCCESS,
          books: [{ author: "Test", title: "Test" }],
        }
      )
    ).toEqual({
      books: [{ author: "Test", title: "Test" }],
      loading: false,
      error: null,
    });
  });

  it("should handle GET_BOOKS_FAILED", () => {
    expect(
      books(
        {
          books: [],
          loading: false,
          error: null,
        },
        {
          type: GET_BOOKS_FAILED,
          message: "Something went wrong",
        }
      )
    ).toEqual({
      books: [],
      loading: false,
      error: "Something went wrong",
    });
  });
});
