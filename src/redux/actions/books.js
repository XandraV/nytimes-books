import * as type from "../reducers/types";

export function getBooks(category) {
  return {
    type: type.GET_BOOKS_REQUESTED,
    payload: {
      category: category,
    },
  };
}
