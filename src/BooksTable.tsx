import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "./redux/actions/books";
import { Table } from "react-bootstrap";
import * as d3 from "d3";
import chroma from "chroma-js";
import { OverlayTrigger, Popover } from "react-bootstrap";

//TODO add animated entrance

const color = d3
.scaleLinear<string>()
.domain([1, 7, 15])
.range(["#FF94BD", "#C7E2FF", "#FFB846"]);

type BooksTableProps = {
  category: string;
};
interface RootState {
  books: { books: Array<object>; loading: boolean; error: { message: string } };
}

const BooksTable: FC<BooksTableProps> = ({ category }) => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);

  useEffect(() => {
    dispatch(getBooks(category));
  }, [category]);

  return (
    <>
      {books.length > 0  && (
        <Table
          striped
          borderless
          hover
          size="sm"
          className="text-center"
          style={{
            borderCollapse: "separate",
            borderSpacing: " 0 2px",
            width: "8%",
            height: "100%",
            fontSize:"0.9rem"
          }}
        >
          <tbody>
            {books.map((book: any, idx) => (
              <OverlayTrigger
                trigger={["hover", "focus"]}
                placement="left"
                overlay={
                  <Popover
                    id="popover-basic"
                    style={{
                      borderBottomColor: `${color(idx)}`,
                      borderWidth: "3px",
                      borderColor: "#fde8d1",
                      backgroundColor: `${color(idx)}`,
                      maxWidth: "30rem",
                    }}
                  >
                    <span className="d-flex p-3">
                      <img alt="" height={150} src={book.book_image} />{" "}
                      <span className="pl-3">
                        <div
                          style={{
                            borderRadius: "0.2rem",
                            padding: "0.2rem",
                            marginBottom:"0.5rem",
                            maxWidth: "6rem",
                            backgroundColor: `${chroma(color(idx)!)
                              .darken(0.5)
                              .saturate(1)}`,
                          }}
                        >
                          #{book.rank} this week
                        </div>
                        <strong>{book.title}</strong>
                        <h6 className="font-italic">by {book.author}</h6>
                        <div>{book.description}</div>
                      </span>
                    </span>
                  </Popover>
                }
              >
                <tr
                  className={`${idx}`}
                  key={book.title}
                  style={{ backgroundColor: `${color(idx)}` }}
                >
                  <td>#{book.rank}</td>
                  <td>
                    <img alt="" height={20} src={book.book_image} />
                  </td>
                </tr>
              </OverlayTrigger>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BooksTable;
