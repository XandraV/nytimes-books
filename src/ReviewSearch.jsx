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
import { nytimes } from "./redux/sagas/nytimes";
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
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/books/v3/reviews.json?author=Jane%20Austen&api-key=EPQfG6lAOJgoKSMq58JMRxSHooAQynA4`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setReviews(data["results"]);
        }
      });
  }, []);

  const handleSearch = () => {
    // document.activeElement.blur();
    fetch(
      `${nytimes.base_url}/svc/books/v3/reviews.json?${filter}=${word}&api-key=${nytimes.api_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setReviews(data["results"]);
        }
      });
  };

  const handleSelectFilter = (f) => {
    // document.activeElement.blur();
    setFilter(f);
  };

  return (
    <Container>
      <Row>
      <h6 style={{ fontWeight: "bold", display: "inline-block" }} className="ml-2 mt-1 mr-2">
        Book Reviews
      </h6>

      <InputGroup as="span" size="sm" className="ml-3 mx-3" style={{display: "contents"}}>
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
        {reviews != null &&
          reviews.length === 0 &&
          `Your search did not match any reviews.`}

        {reviews != null &&
          reviews.length > 0 &&
          reviews.slice(0, 2).map((rev, idx) => (
            <Row
              key={idx}
              className="mb-2 border-bottom pb-2"
              style={{ textAlign: "left" }}
            >
              <Col>
                <h5>{rev.book_title}</h5>
                <span>by {rev.book_author}</span>
                <Button
                  variant="outline-warning"
                  href={rev.url}
                  target="_blank"
                  style={{ float: "right" }}
                  size="sm"
                >
                  Go to Review
                </Button>
              </Col>
            </Row>
          ))}
      </Container>
      </Row>
    </Container>
  );
}

export default ReviewSearch;
