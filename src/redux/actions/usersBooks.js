import * as type from "../reducers/types";

export function getUsersBooks(token) {
  return {
    type: type.GET_USERS_BOOKS_REQUESTED,
    payload: {
      token: token,
    },
  };
}