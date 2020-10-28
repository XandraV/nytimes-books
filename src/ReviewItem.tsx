import React, { FC } from "react";
import { Button, Col, Row } from "react-bootstrap";

type ReviewItemProps = {
  item: any;
};

const ReviewItem: FC<ReviewItemProps> = ({ item }) => {
  return (
    <Row className="pb-2 text-left">
      <Col>
        <div>{item?.book_title}</div>
        <div style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
          review by {item.byline}
        </div>
      </Col>
      <Col className="mt-3">
        <Button
          className="float-right"
          variant="outline-warning"
          href={item.url}
          target="_blank"
          size="sm"
        >
          Go to Review
        </Button>
      </Col>
    </Row>
  );
};

export default ReviewItem;
