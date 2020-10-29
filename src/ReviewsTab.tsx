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
import { reviewsPopular, reviewsBestSellers } from "./ReviewsDeafultData";

const DropdownWrapper = styled.span`
  button {
    background-color: #fbb06f;
    border-color: #fbb06f;
  }
`;

interface RootState {
  reviews: {
    reviews: Array<object | string>;
    loading: boolean;
    error: { message: string };
  };
}

const ReviewsTab = () => {
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
  console.log(reviews);
  return (
    <Container style={{ display: "contents"}}>
      <Col className="mr-3 pt-2" sm={5} style={{ border: "1px solid white", borderRadius: "0.5rem" }}>
        <b>Best Seller Reviews</b>
        <Container className="mt-2 mb-1">
          {reviewsBestSellers.map((review, idx) => (
            <ReviewItem key={`static-revs-${idx}`} item={review} />
          ))}
        </Container>
      </Col>
      <Col sm={6}>
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
                onSelect={(f: any) => handleSelectFilter(f)}
              >
                <Dropdown.Item eventKey="title">title</Dropdown.Item>
                <Dropdown.Item eventKey="author">author</Dropdown.Item>
                <Dropdown.Item eventKey="isbn">isbn</Dropdown.Item>
              </DropdownButton>
            </DropdownWrapper>
          </InputGroup>
        </Row>
        <Row>
          <Container className="mt-1 mb-1">
            {loading && <p>Loading...</p>}
            {reviews.length === 0 && reviews[0] !== "" && !loading && (
              <p className="m-5">Your search did not match any reviews.</p>
            )}

            {reviews[0] === "" && !loading ? (
              <p className="m-5">
                Type a title, author or isbn to search for reviews.
              </p>
            ) : (
              reviews.length > 0 &&
              !loading && (
                <Row
                  className="mt-1 mb-1"
                  style={{ height: "120px", overflow: "auto", border: "1px solid white", borderRadius: "0.5rem" }}
                >
                  <Container className="mt-1 mb-1">
                    {reviews
                      .map((review: object | string, idx: number) => (
                        <ReviewItem key={idx} item={review} />
                      ))}
                  </Container>
                </Row>
              )
            )}

            {error && !loading && <p>{error}</p>}
          </Container>
        </Row>
        <Row className="text-left" style={{ border: "1px solid white", borderRadius: "0.5rem" }}>
          <b className="mt-1 ml-3">Popular Searches</b>
          <Container className="mt-1 mb-1">
            {reviewsPopular.map((review, idx) => (
              <ReviewItem key={`static-revs-${idx}`} item={review} />
            ))}
          </Container>
        </Row>
      </Col>
    </Container>
  );
};

export default ReviewsTab;
