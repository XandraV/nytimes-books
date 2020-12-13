import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/actions/login";
import { Col, Container, Form, Row , Alert} from "react-bootstrap";
import PageWrapper from "./PageWrapper";
import Logo from "./Logo";
import BarPlot from "./BarPlot";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import DataVizDescription from "./DataVizDescription";

interface RootState {
  login: {
    loading: string;
    error: string;
  };
}
const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.login.loading) as any;
  const error = useSelector((state: RootState) => state.login.error);
  const [category, setCategory] = useState("hardcover-fiction");
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username: (usernameRef.current as any).value,
        password: (passwordRef.current as any).value,
      })
    );
  };

  // async function refreshOldToken(token: string) {
  //   const newToken = await fetchRefreshToken(token);
  //   setAccessToken(newToken);
  // }

  // function handleRefreshToken() {
  //   refreshOldToken(refreshToken);
  // }

  return (
    <PageWrapper>
      <Container className="m-0" style={{ display: "contents" }}>
        <Row className="m-3">
          <Col>
            <Logo />
            <div className="p-0">
              <DataVizDescription />
              <div className="radio ml-2">
                  <RadioGroup
                    aria-label="category"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
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
              </div>
            </div>
          </Col>
          <>
            <Col className="p-0">
              <BarPlot category={category} />
            </Col>
            <Col className="p-0">
              <Form
                className="m-3 p-3 align-items-center v-100 bg-transparent"
                onSubmit={handleSubmit}
                style={{
                  maxWidth: "250px",
                  borderRadius: "0.75rem",
                  border: "2px solid white",
                }}
              >
                <h6 className="text-center mb-3 font-weight-bold">Log In</h6>
                {error && <Alert variant="danger">{"Please enter a valid username or password."}</Alert>}
                <Form.Group id="email">
                  <Form.Label>Username: Alice</Form.Label>
                  <Form.Control type="username" ref={usernameRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <div className="text-center">
                  <button
                    disabled={loading}
                    className="btn btn-secondary"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </Form>
            </Col>
          </>
        </Row>
      </Container>
    </PageWrapper>
  );
};

function fetchRefreshToken(token: string) {
  return fetch(`http://localhost:5000/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      charset: "UTF-8",
    },
    method: "POST",
    body: JSON.stringify({ refreshToken: token }),
  })
    .then((response) => response.json())
    .then((data) => data.accessToken)
    .catch((error) => {
      throw error;
    });
}

export default Home;
