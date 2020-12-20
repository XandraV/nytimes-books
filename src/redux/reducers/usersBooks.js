import * as type from "./types";

const initialState = {
  usersBooks: [],
  loading: false,
  error: null,
};

export default function usersBooks(state = initialState, action) {
  switch (action.type) {
    case type.GET_USERS_BOOKS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_USERS_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.books,
      };
    case type.GET_USERS_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
