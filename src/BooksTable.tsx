import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "./redux/actions/books";
import { Table } from "react-bootstrap";
import chroma from "chroma-js";

const color = chroma.scale(["#f08080", "#c3dbba", "#ffd1a1"]).domain([10, 0]);

type BooksTableProps = {
  category: string;
};
interface RootState {
  books: { books: Array<object>; loading: boolean; error: { message: string } };
}

const BooksTable: FC<BooksTableProps> = ({ category }) => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);

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
          className="text-center"
          style={{
            borderCollapse: "separate",
            borderSpacing: " 0 4px",
            width: "600px",
          }}
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
            {books.slice(0, 10).map((book: any, idx) => (
              <tr key={book.title} style={{ backgroundColor: `${color(idx)}` }}>
                <td>#{book.rank}</td>
                <td>
                  <img alt="" height={20} src={book.book_image} />
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
    </>
  );
};

export default BooksTable;
