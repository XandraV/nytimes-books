import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import RankingChartRow from "./RankingChartRow";
import { OverlayTrigger, Popover } from "react-bootstrap";
import chroma from "chroma-js";
import * as d3 from "d3";

const svgWidth = 500;
const svgHeight = 385;
const yScale = d3.scaleLinear().domain([0, 10]).range([svgHeight, 0]);
const color = chroma.scale(["#f08080", "#c3dbba", "#ffd1a1"]).domain([0, 10]);

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
  const loading = useSelector((state: RootState) => state.books.loading);
  const books = useSelector((state: RootState) => state.books.books);
  const error = useSelector((state: RootState) => state.books.error);

  const chartData = books
    .slice(0, 10)
    .map((book) => {
      return {
        title: book.title,
        rank: book.rank,
        rankLastWeek: book.rank_last_week,
        weeksOnList: book.weeks_on_list,
      };
    })
    .reverse();

  return (
    <div className="pt-2">
      <Row>
        <Col>
          <b>Ranking</b>
        </Col>
        <Col className="text-right">
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
            return (
              <g
                key={`group-${idx}`}
                transform={`translate(-10,${yScale(idx)! + 10})`}
              >
                <RankingChartRow width={svgWidth} book={book} idx={idx} />
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="left"
                  overlay={
                    <Popover
                    className="p-2 pr-3 pl-3"
                      id="popover-basic"
                      style={{
                        borderBottomColor: `${color(idx+1)}`,
                        borderWidth: "3px",
                        borderColor: "#fde8d1",
                        backgroundColor: `${color(idx+1)}`,
                      }}
                    >
                      <span>
                        <strong>{chartData.length-idx}</strong>
                      </span>
                    </Popover>
                  }
                >
                  <g>
                    {new Array(book.weeksOnList).fill(0).map((_, idx2) => (
                      <rect
                        key={`cube-${idx2}`}
                        transform={`translate(${600 - idx2 * 12}, -30)`}
                        width={10}
                        height={20}
                        fill={`${color(idx+1)}`}
                        rx={3}
                        ry={3}
                      />
                    ))}
                  </g>
                </OverlayTrigger>
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
