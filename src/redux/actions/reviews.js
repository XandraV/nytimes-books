import * as type from "../reducers/types";

export function getReviews(word, filter) {
  return {
    type: type.GET_REVIEWS_REQUESTED,
    payload: {
      word: word,
      filter: filter,
    },
  };
}
