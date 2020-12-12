import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/actions/login";
import { Col, Container, Row } from "react-bootstrap";
import PageWrapper from "./PageWrapper";
import Logo from "./Logo";
import BarPlot from "./BarPlot";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import DataVizDescription from "./DataVizDescription";
import styled from "styled-components/macro";
const StyledForm = styled.form`
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 2px solid white;
  max-width: 20rem;
  div.btn-submit {
    text-align: center;
    margin: 0.5rem;
  }
  h6 {
    font-weight: bold;
    text-align: center;
  }
`;

const Home = () => { 
  const dispatch = useDispatch();
  const [category, setCategory] = useState("hardcover-fiction");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleLogin(event: any) {
    event.preventDefault();
    dispatch(loginUser(credentials));
  }

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleFormChange = (event: any) => {
    const { id, value } = event.target;
    
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(loginUser(credentials));
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
                <FormControl component="fieldset">
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
                </FormControl>
              </div>
            </div>
          </Col>
          <>
            <Col className="p-0">
              <BarPlot category={category} />
            </Col>
            <Col className="p-0">
              <StyledForm onSubmit={handleSubmit}>
                <h6>Log in</h6>
                <label>Username - Alice</label>
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  aria-describedby="usernameHelp"
                  value={credentials.username}
                  onChange={handleFormChange}
                />
                <br />

                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={credentials.password}
                  onChange={handleFormChange}
                />
              <div className="btn-submit">
                <button className="btn btn-secondary" onClick={handleLogin}>
                  Log in
                </button>
              </div>
              </StyledForm>
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
