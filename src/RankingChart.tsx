import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import * as d3 from "d3";
import chroma from "chroma-js";
import Tooltip from "./Tooltip";

const svgHeight = 390;
const svgWidth = 500;

const color = chroma.scale(["#f08080", "#c3dbba", "#ffd1a1"]).domain([0, 10]);
const xScale = d3
  .scaleLinear()
  .domain([0, 11])
  .range([20, svgWidth / 2]);
const yScale = d3.scaleLinear().domain([0, 10]).range([svgHeight, 0]);

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
const RankingChart: FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const loading = useSelector((state: RootState) => state.books.loading);
  const books = useSelector((state: RootState) => state.books.books);
  const error = useSelector((state: RootState) => state.books.error);

  const chartData = books.slice(0, 10).map((book) => {
    return {
      title: book.title,
      rank: book.rank,
      rankLastWeek: book.rank_last_week,
      weeksOnList: book.weeks_on_list,
    };
  });

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
                  transform={`translate(-10,${yScale(idx)! + 5})`}
                  onMouseOver={() =>
                    setHoveredPoint({
                      idx: idx,
                      x: xScale(book["rank"]),
                      y: yScale(idx),
                      book: chartData[chartData.length - idx - 1],
                    } as any)
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {hoveredPoint && (hoveredPoint as any).idx === idx && (
                    // background shadow/highlight for hovered row
                    <rect
                      transform={`translate(0, -45)`}
                      width={630}
                      height={50}
                      fill={"#fff2d2"}
                      rx={3}
                      ry={3}
                    />
                  )}

                  {hoveredPoint && (hoveredPoint as any).idx === idx && (
                    <Tooltip hoveredPoint={hoveredPoint as any} />
                  )}

                  {new Array(book.weeksOnList).fill(0).map((z, idx2) => (
                    // visualisation of weeks on list, right side of the chart
                    <rect
                      transform={`translate(${600 - idx2 * 12}, -30)`}
                      width={10}
                      height={20}
                      fill={`${color(idx)}`}
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
                    fill={`${color(idx)}`}
                    stroke={`${color(idx)}`}
                    strokeWidth="0.1rem"
                  />
                  <circle
                    key={`current-point-${idx}`}
                    cx={xScale(book["rank"])}
                    cy={-35}
                    r={8}
                    fill={`${(color(idx) as any).saturate(2)}`}
                    opacity={0.5}
                  />
                  <circle
                    key={`previous-point-${idx}`}
                    cx={xScale(book["rankLastWeek"])}
                    cy={-10}
                    r={4}
                    fill={`${(color(idx) as any).saturate(2)}`}
                    opacity={0.5}
                  />
                </g>
              </g>
            );
          })}
        </svg>
      )}
      {error && error.message}
    </div>
  );
};

export default RankingChart;
