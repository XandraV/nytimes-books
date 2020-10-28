import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "./redux/actions/reviews";
import styled from "styled-components/macro";
import ReviewItem from "./ReviewItem";

const DropdownWrapper = styled.span`
  button {
    background-color: #fbb06f;
    border-color: #fbb06f;
  }
`;

const reviewsJaneAusten = [
  {
    book_title: "Novels",
    byline: "MIRANDA SEYMOUR",
    url:
      "http://query.nytimes.com/gst/fullpage.html?res=9D00EED91E3CF931A25755C0A9679D8B63",
  },
  {
    book_title: "Sense",
    byline: "MARC TRACY",
    url:
      "http://query.nytimes.com/gst/fullpage.html?res=9C07E1DA1231F93BA15751C0A9669D8B63",
  },
  {
    book_title: "Northanger Abbey",
    byline: "JO BAKER",
    url:
      "http://www.nytimes.com/2014/06/15/books/review/val-mcdermids-northanger-abbey.html",
  },
  {
    book_title: "Mansfield Park",
    byline: "BARBARA KANTROWITZ",
    url:
      "http://www.nytimes.com/1999/10/31/movies/film-making-an-austen-heroine-more-like-austen.html",
  },
];

interface RootState {
  reviews: {
    reviews: Array<object | string>;
    loading: boolean;
    error: { message: string };
  };
}

const ReviewSearch = () => {
  const [word, setWord] = useState("");
  const [filter, setFilter] = useState<string | null>("Please select");

  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const loading = useSelector((state: RootState) => state.reviews.loading);
  const error = useSelector((state: RootState) => state.reviews.error);

  const handleSearch = () => {
    dispatch(getReviews(word, filter as any));
  };

  const handleSelectFilter = (fltr: string) => {
    setFilter(fltr);
  };

  return (
    <Container style={{ display: "contents" }}>
      <Col sm={5}>
        <b>Jane Austen</b>
        <Row>
          <Container className="mt-1 mb-1" style={{ height: "150px" }}>
            {reviewsJaneAusten.map((review, idx) => (
              <ReviewItem key={`static-revs-${idx}`} item={review} />
            ))}
          </Container>
        </Row>
      </Col>
      <Col sm={5}>
        <Row>
          <InputGroup
            as="span"
            size="sm"
            className="ml-3 mx-3"
            style={{ display: "contents" }}
          >
            <FormControl
              type="text"
              placeholder="author, title, ISBN..."
              onChange={(e) => setWord(e.target.value)}
            />
            <Button
              size="sm"
              type="submit"
              className="ml-2"
              onClick={() => handleSearch()}
              style={{ background: "lightcoral", borderColor: "lightcoral" }}
            >
              Search
            </Button>
            <DropdownWrapper>
              <DropdownButton
                size="sm"
                className="ml-2"
                as={ButtonGroup}
                variant={"warning"}
                title={filter}
                onSelect={(f:any) => handleSelectFilter(f)}
              >
                <Dropdown.Item eventKey="title">title</Dropdown.Item>
                <Dropdown.Item eventKey="author">author</Dropdown.Item>
                <Dropdown.Item eventKey="isbn">isbn</Dropdown.Item>
              </DropdownButton>
            </DropdownWrapper>
          </InputGroup>
        </Row>
        <Row>
          <Container className="mt-1 mb-1" style={{ height: "150px" }}>
            {loading && <p>Loading...</p>}
            {reviews.length === 0 &&
              !loading &&
              `Your search did not match any reviews.`}
            {reviews[0] === "" && !loading
              ? `Type a title, author or isbn to search for reviews.`
              : reviews.length > 0 &&
                !loading &&
                reviews.map((review: object | string, idx: number) => (
                  <ReviewItem key={idx} item={review} />
                ))}
            {error && !loading && <p>{error}</p>}
          </Container>
        </Row>
      </Col>
    </Container>
  );
};

export default ReviewSearch;
