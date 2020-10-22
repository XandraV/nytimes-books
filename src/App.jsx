import React, { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components/macro";
// import BooksTable from "./BooksTable";
import RankingChart from "./RankingChart";
import ReviweSearch from "./ReviewSearch";
import Logo from "./Logo";
const categories = [
  { title: "Fiction", category: "hardcover-fiction" },
  { title: "Non-Fiction", category: "hardcover-nonfiction" },
  { title: "Fashion", category: "fashion-manners-and-customs" },
  { title: "Science", category: "science" },
];
const PageWrapper = styled.div`
  text-align: center;
  nav > a.nav-link.active,
  nav > a.nav-link {
    color: black;
    background-color: #fde8d1;
    border-bottom: 1px solid #ffffff;
  }
  nav > a.nav-link.active {
    border-color: #ffffff;
    border-bottom: transparent;
  }
  nav {
    border-bottom: 1px solid #ffffff;
  }
`;

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
            <Container className="m-3">
              <Row>
                <Col>
                  {/* <BooksTable category={cat.category} /> */}
                </Col>
                <Col>
                  <Row>
                    <ReviweSearch />
                  </Row>
                  <Row>
                    <RankingChart category={cat.category} />
                  </Row>
                </Col>
              </Row>
            </Container>
          </Tab>
        ))}
      </Tabs>
    </PageWrapper>
  );
}

export default App;
