import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import * as d3 from "d3";
import chroma from "chroma-js";
import StyledTooltip from "./StyledTooltip";

const svgHeight = 390;
const svgWidth = 500;

// const color = chroma.scale(["#c3dbba", "#ffd1a1", "#f08080"]).domain([0, 10]);
const color = chroma.scale(["#f08080","#c3dbba", "#ffd1a1"]).domain([0, 10]);
const xScale = d3
  .scaleLinear()
  .domain([0, 11])
  .range([20, svgWidth / 2]);
const yScale = d3.scaleLinear().domain([0, 10]).range([svgHeight, 0]);

function RankingChart() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const loading = useSelector((state) => state.books.loading);
  const books = useSelector((state) => state.books.books);
  const error = useSelector((state) => state.books.error);

  const chartData = books.slice(0, 10).map((book) => {
    return {
      title: book.title,
      rank: book.rank,
      rankLastWeek: book.rank_last_week,
      weeksOnList: book.weeks_on_list,
      image: book.book_image,
    };
  });
  console.log(hoveredPoint);
  return (
    <div className="pt-2">
      <Row>
        <Col>
          <b>Ranking</b>
        </Col>
        <Col>
          <b>Weeks on List</b>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <svg
          width={svgWidth}
          height={svgHeight}
          style={{ overflow: "visible" }}
        >
          <path
            d={["M", 10, svgHeight, "v", 0, "V", 10, "v", 6].join(" ")}
            fill="none"
            stroke="lightgrey"
          />

          {chartData.map((book, idx) => {
            const change = book["rank"] - book["rankLastWeek"] > 0;
            return (
              <g key={`group-${idx}`}>
                <g
                  key={`current-${idx}`}
                  transform={`translate(-10,${yScale(idx) + 5})`}
                  onMouseOver={() =>
                    setHoveredPoint({
                      idx: idx,
                      x: xScale(book["rank"]),
                      y: yScale(idx),
                      book: chartData[chartData.length - idx - 1],
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {hoveredPoint && hoveredPoint.idx === idx && (
                    <rect
                      transform={`translate(0, -45)`}
                      width={630}
                      height={50}
                      fill={"#fff2d2"}
                      rx={3}
                      ry={3}
                    />
                  )}

                  {hoveredPoint && hoveredPoint.idx === idx && (
                    <StyledTooltip hoveredPoint={hoveredPoint} />
                  )}

                  {new Array(book.weeksOnList).fill(0).map((z, idx2) => (
                    <rect
                      transform={`translate(${600 - idx2 * 12}, -30)`}
                      width={10}
                      height={20}
                      fill={color(idx)}
                      rx={3}
                      ry={3}
                    />
                  ))}

                  <path
                    d={[
                      "M",
                      20,
                      -35,
                      "L",
                      xScale(book["rank"]),
                      -35,
                      "C",
                      xScale(book["rank"]),
                      change ? -20 : -33,
                      change ? xScale(book["rank"] / 2) : xScale(book["rank"]),
                      change ? -30 : -20,
                      xScale(book["rankLastWeek"]),
                      -10,
                      "L",
                      20,
                      -10,
                      "Z",
                    ].join(" ")}
                    fill={color(idx)}
                    stroke={color(idx)}
                    strokeWidth="0.1rem"
                  />
                  <circle
                    key={`current-point-${idx}`}
                    cx={xScale(book["rank"])}
                    cy={-30}
                    r={8}
                    fill={color(idx).saturate(2)}
                    opacity={0.5}
                  />
                  <circle
                    key={`previous-point-${idx}`}
                    cx={xScale(book["rankLastWeek"])}
                    cy={-10}
                    r={4}
                    fill={color(idx).saturate(2)}
                    opacity={0.5}
                  />
                  {/* <text
                  key={idx}
                  style={{
                    fontSize: "0.7rem",
                    textAnchor: "end",
                    transform: "translateY(-20px)",
                    fill: "grey",
                  }}
                >
                  T
                </text> */}
                </g>
                <g
                  key={`previous-${idx}`}
                  transform={`translate(-10,${yScale(idx)})`}
                >
                  {/* <text
                  key={idx}
                  style={{
                    fontSize: "0.7rem",
                    textAnchor: "end",
                    transform: "translateY(0px)",
                    fill: "grey",
                  }}
                >
                  L
                </text> */}
                </g>
              </g>
            );
          })}
          {/* <circle cx={30} cy={0} r={10} fill={"black"} /> */}
        </svg>
      )}
      {error && error.message}
    </div>
  );
}

export default RankingChart;
