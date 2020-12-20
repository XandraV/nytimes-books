import { combineReducers } from "redux";
import books from "./books";
import usersBooks from "./usersBooks";
import login from "./login";

const rootReducer = combineReducers({
  books,
  login,
  usersBooks
});

export default rootReducer;
