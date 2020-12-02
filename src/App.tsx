import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BooksTable from "./BooksTable";
import PageWrapper from "./PageWrapper";
import Logo from "./Logo";
import BarPlot from "./BarPlot";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DataVizDescription from "./DataVizDescription";

function App() {
  const [category, setCategory] = useState("hardcover-fiction");

  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };
  return (
    <PageWrapper>
      <Container className="m-0" style={{ display: "contents" }}>
        <Row className="m-3">
          <div className="p-0">
            <Logo />
            <div className="title mb-3">
              Top 15 Best Selling Books in Category: Fiction
            </div>
            <div className="title mb-2">Reading the data visualisation</div>
            <div className="mb-1">
              <svg width={10} height={10}>
                <rect width={10} height={10} fill={"#FF94BD"} rx={3} ry={3} />
              </svg>{" "}
              rank this week
            </div>
            <div>
              <svg width={10} height={10}>
                <rect width={10} height={10} fill={"#ffffffa8"} rx={3} ry={3} />
              </svg>{" "}
              rank last week
            </div>
            <DataVizDescription />
            <div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={category}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="hardcover-fiction"
                    control={<Radio size="small" />}
                    label="Fiction"
                  />
                  <FormControlLabel
                    value="hardcover-nonfiction"
                    control={<Radio size="small" />}
                    label="Non-fiction"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <Col className="p-0">
            <BarPlot />
          </Col>
          <Col className="table">
            <BooksTable category={category} />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
}

export default App;
