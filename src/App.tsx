import React, { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import BooksTable from "./BooksTable";
import RankingChart from "./RankingChart";
import ReviewsTab from "./ReviewsTab";
import PageWrapper from "./PageWrapper";
import Logo from "./Logo";

const categories = [
  { title: "Fiction", category: "hardcover-fiction" },
  { title: "Reviews", category: "reviews" },
];

function App() {
  const [key, setKey] = useState<string | null>("Fiction");
  return (
    <PageWrapper>
      <Logo />
      <h3>Best Selling Books</h3>
      <Tabs
        className="mr-4 ml-4"
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        {categories.map((cat) => (
          <Tab
            key={cat.category}
            className="p-1"
            eventKey={cat.title}
            title={cat.title}
            style={{
              background: "#fde8d1",
              textAlign: `${cat.title === "Reviews" ? "-webkit-center" : ""}`,
            }}
          >
            <Container className="m-1">
              {key !== "Reviews" ? (
                <Row>
                  <Col>
                    <BooksTable
                      category={
                        (categories as any).find(
                          (c: { title: string }) => c.title === key
                        ).category
                      }
                    />
                  </Col>
                  <Col className="p-0">
                    <RankingChart />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <ReviewsTab />
                </Row>
              )}
            </Container>
          </Tab>
        ))}
      </Tabs>
    </PageWrapper>
  );
}

export default App;
