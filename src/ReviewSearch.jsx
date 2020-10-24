import React, { useEffect, useState } from "react";
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

const DropdownWrapper = styled.span`
  button {
    background-color: #fbb06f;
    border-color: #fbb06f;
  }
`;

function ReviewSearch() {
  const [word, setWord] = useState("");
  const [filter, setFilter] = useState("Please select");

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const loading = useSelector((state) => state.reviews.loading);
  const error = useSelector((state) => state.reviews.error);

  useEffect(() => {
    dispatch(getReviews("Jane Austen", "author"));
  }, []);

  const handleSearch = () => {
    // document.activeElement.blur();
    dispatch(getReviews(word, filter));
  };

  const handleSelectFilter = (f) => {
    // document.activeElement.blur();
    setFilter(f);
  };

  return (
    <Container>
      <Row>
        <b className="ml-2 mt-1 mr-2">Book Reviews</b>
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
              onSelect={(f) => handleSelectFilter(f)}
            >
              <Dropdown.Item eventKey="title">title</Dropdown.Item>
              <Dropdown.Item eventKey="author">author</Dropdown.Item>
              <Dropdown.Item eventKey="isbn">isbn</Dropdown.Item>
            </DropdownButton>
          </DropdownWrapper>
        </InputGroup>
      </Row>
      <Row>
        <Container className="mt-3 mb-1" style={{ height: "150px" }}>
          {loading && <p>Loading...</p>}
          {reviews.length === 0 &&
            !loading &&
            `Your search did not match any reviews.`}
          {reviews.length > 0 &&
            !loading &&
            reviews.slice(0, 2).map((rev, idx) => (
              <Row key={idx} className="mb-2 border-bottom pb-2 text-left">
                <Col>
                  <h5>{rev.book_title}</h5>
                  <span>by {rev.book_author}</span>
                  <Button
                    className="float-right"
                    variant="outline-warning"
                    href={rev.url}
                    target="_blank"
                    size="sm"
                  >
                    Go to Review
                  </Button>
                </Col>
              </Row>
            ))}
          {error && !loading && <p>{error}</p>}
        </Container>
      </Row>
    </Container>
  );
}

export default ReviewSearch;
