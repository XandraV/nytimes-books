import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "./redux/actions/books";
import { Table } from "react-bootstrap";

function BooksTable({ category }) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(getBooks(category));
  }, [category]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {books.length > 0 && !loading && (
        <Table
          striped
          borderless
          hover
          size="sm"
          style={{ textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Rank</th>
              <th></th>
              <th>Author</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {books.slice(0, 10).map((book) => (
              <tr key={book.title}>
                <td>{book.rank}</td>
                <td>
                  <img alt="" height={30} src={book.book_image} />
                </td>
                <td>{book.author}</td>
                <td>
                  {book.title.charAt(0) + book.title.slice(1).toLowerCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {error && !loading && <p>{error}</p>}
    </>
  );
}

export default BooksTable;
