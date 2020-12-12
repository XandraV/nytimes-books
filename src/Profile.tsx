import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersBooks } from "./redux/actions/usersBooks";
import { Col, Container, Row } from "react-bootstrap";
import PageWrapper from "./PageWrapper";
import chroma from "chroma-js";
import { Table, OverlayTrigger, Popover } from "react-bootstrap";
import DataVizDescription from "./DataVizDescription";
import * as d3 from "d3";
import ProfileBarPlot from "./ProfileBarPlot";

interface RootState {
  usersBooks: {
    books: Array<{
      title: string;
      author: number;
      score: number;
      readTime: number;
    }>;
    loading: boolean;
    error: { message: string };
  };
}

const color = d3
  .scaleLinear<string>()
  .domain([0, 7, 15])
  .range(["#FF94BD", "#C7E2FF", "#FFB846"]);

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [accessToken, setAccessToken] = useState(user.accessToken || "");
  const [refreshToken, setRefreshToken] = useState(user.refreshToken || "");
  const books = useSelector((state: RootState) => state.usersBooks.books);
  const loading = useSelector((state: RootState) => state.usersBooks.loading);

  useEffect(() => {
    dispatch(getUsersBooks(accessToken));
  }, []);

  async function logOut(token: string) {
    localStorage.removeItem("currentUser");
    return await fetch(`http://localhost:5000/logout`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        charset: "UTF-8",
      },
      method: "DELETE",
      body: JSON.stringify({ token: token }),
    }).then(() => {
      localStorage.removeItem("currentUser");
      history.push("/");
    });
  }

  function handleLogOut() {
    logOut(refreshToken);
  }
  return (
    <PageWrapper>
      <Container className="m-0" style={{ display: "contents" }}>
        {!books && loading && "Loading"}
        {books && !loading && (
          <Row className="m-3">
            <Col>
              <h4
                style={{
                  color: "black",
                  borderRadius: "0.2rem",
                  padding: "0.2rem",
                  backgroundColor: `pink`,
                }}
              >
                {user.username}'s books
              </h4>
              <Table
                striped
                borderless
                hover
                size="sm"
                className="text-center"
                style={{
                  borderCollapse: "separate",
                  borderSpacing: " 0 4px",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th>Score</th>
                    <th>Author</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book: any, idx) => (
                    <tr
                      className={`${idx}`}
                      key={book.title}
                      style={{ backgroundColor: `${color(idx)}` }}
                    >
                      <td>{book.score}</td>
                      <td>{book.author}</td>
                      <td>
                        {book.title.charAt(0) +
                          book.title.slice(1).toLowerCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <ProfileBarPlot books={books} />
              <button
                className="btn btn-secondary float-right"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </Col>
          </Row>
        )}
      </Container>
    </PageWrapper>
  );
};

export default Profile;
