import * as type from "../reducers/types";
export const loginUser = (credentials) => {
  return {
    type: type.LOGIN_USER,
    payload: {
      credentials: credentials,
    },
  };
};
