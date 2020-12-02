import React, { FC } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import { OverlayTrigger, Popover } from "react-bootstrap";
import styled from "styled-components/macro";

const StyledCell = styled.div`
 
    font-size: 0.9rem;
    margin: 0.1rem;
    padding: 0.2rem 1rem 0.5rem 0.5rem;
    width: 4.2rem;
    border-radius: 0.2rem;
    @-webkit-keyframes slide-in-top {
      0% {
        -webkit-transform: translateY(-1000px);
        transform: translateY(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes slide-in-top {
      0% {
        -webkit-transform: translateY(-1000px);
        transform: translateY(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
      }
    }
    -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      0.5s both;
    animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
  
`;

const color = d3
  .scaleLinear<string>()
  .domain([1, 7, 15])
  .range(["#FF94BD", "#C7E2FF", "#FFB846"]);

type BooksTableProps = {
  books: any;
};

const BooksTable: FC<BooksTableProps> = ({ books }) => (
    books.length > 0 &&
        books.map((book: any, idx: number) => (
          <OverlayTrigger
            key={`book${idx}`}
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
                        marginBottom: "0.5rem",
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
            <StyledCell
              className={`cell ${idx}`}
              key={book.title}
              style={{
                backgroundColor: `${color(idx)}`,
                marginLeft: `${idx % 2 === 0 ? "1rem" : 0}`,
              }}
            >
              <span>#{book.rank}</span>
              <span style={{ float: "right" }}>
                <img alt="" height={20} src={book.book_image} />
              </span>
            </StyledCell>
          </OverlayTrigger>
        ))
  );


export default BooksTable;
