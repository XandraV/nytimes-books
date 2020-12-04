import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "./redux/actions/books";
import { Col, Container, Row } from "react-bootstrap";
import PageWrapper from "./PageWrapper";
import Logo from "./Logo";
import BarPlot from "./BarPlot";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DataVizDescription from "./DataVizDescription";
import "./App.css";

interface RootState {
  books: {
    books: Array<{
      title: string;
      rank: number;
      rank_last_week: number;
      weeks_on_list: number;
    }>;
    loading: boolean;
    error: { message: string };
  };
}

function App() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("hardcover-fiction");
  const loading = useSelector((state: RootState) => state.books.loading);
  const books = useSelector((state: RootState) => state.books.books);
  const error = useSelector((state: RootState) => state.books.error);

  useEffect(() => {
    dispatch(getBooks(category));
  }, [category, dispatch]);

  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };
  return (
    <PageWrapper>
      <Container className="m-0" style={{ display: "contents" }}>
        <Row className="m-3">
          <div className="p-0">
            <Logo />
            <div className="title-main mb-3">
              Top 15 Best Selling Books in Category: Fiction
            </div>
            <div className="ml-4">
              <div className="title-sub mb-2">
                Reading the data visualisation
              </div>
              <div className="rank mb-1">
                <svg width={10} height={10}>
                  <rect width={10} height={10} fill={"#FF94BD"} rx={3} ry={3} />
                </svg>{" "}
                rank this week
              </div>
              <div className="rank">
                <svg width={10} height={10}>
                  <rect
                    width={10}
                    height={10}
                    fill={"#ffffffa8"}
                    rx={3}
                    ry={3}
                  />
                </svg>{" "}
                rank last week
              </div>
              <DataVizDescription />
              <div className="radio ml-2">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="category"
                    name="category"
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
          </div>
          {loading && <div>Loading...</div>}
          {books.length > 0 && !loading && (
            <>
              <Col className="p-0 ml-5">
                <BarPlot books={books} />
              </Col>
            </>
          )}
          {error && <div>Failed to load data for {category} books.</div>}
        </Row>
      </Container>
    </PageWrapper>
  );
}

export default App;
