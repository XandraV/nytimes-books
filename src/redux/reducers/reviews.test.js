import reviews from "./reviews";
import {
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_REQUESTED,
  GET_REVIEWS_FAILED,
} from "./types";

describe("reviews reducer", () => {
  it("should return the initial state", () => {
    expect(reviews(undefined, {})).toEqual({
      reviews: [],
      loading: false,
      error: null,
    });
  });

  it("should handle GET_REVIEWS_REQUESTED", () => {
    expect(
      reviews(
        {
          reviews: [],
          loading: false,
          error: null,
        },
        {
          type: GET_REVIEWS_REQUESTED,
        }
      )
    ).toEqual({
      reviews: [],
      loading: true,
      error: null,
    });
  });

  it("should handle GET_REVIEWS_SUCCESS", () => {
    expect(
      reviews(
        {
          reviews: [],
          loading: false,
          error: null,
        },
        {
          type: GET_REVIEWS_SUCCESS,
          reviews: [{ author: "Test", title: "Test" }],
        }
      )
    ).toEqual({
      reviews: [{ author: "Test", title: "Test" }],
      loading: false,
      error: null,
    });
  });

  it("should handle GET_REVIEWS_FAILED", () => {
    expect(
      reviews(
        {
          reviews: [],
          loading: false,
          error: null,
        },
        {
          type: GET_REVIEWS_FAILED,
          message: "Something went wrong",
        }
      )
    ).toEqual({
      reviews: [],
      loading: false,
      error: "Something went wrong",
    });
  });
});
