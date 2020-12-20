import * as type from "./types";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case type.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case type.LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
