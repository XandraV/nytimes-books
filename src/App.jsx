import React, { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import BooksTable from "./BooksTable";
import RankingChart from "./RankingChart";
import ReviweSearch from "./ReviewSearch";
import PageWrapper from "./PageWrapper";
import Logo from "./Logo";

const categories = [
  { title: "Fiction", category: "hardcover-fiction" },
  { title: "Reviews", category: "reviews" },
];

function App() {
  const [key, setKey] = useState("Fiction");

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
          >
            <Container className="m-1">
              {key !== "Reviews" ? (
                <Row>
                  <Col>
                    <BooksTable
                      category={
                        categories.find((c) => c.title === key).category
                      }
                    />
                  </Col>
                  <Col className="p-0">
                    <RankingChart />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <ReviweSearch />
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
