import { combineReducers } from "redux";
import books from "./books";
import reviews from "./reviews";

const rootReducer = combineReducers({
  books: books,
  reviews: reviews,
});

export default rootReducer;
