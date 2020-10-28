import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import RankingChartRow from "./RankingChartRow";

const svgWidth = 500;
const svgHeight = 385;

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
              <g key={`group-${idx}`}>
                <RankingChartRow
                  width={svgWidth}
                  height={svgHeight}
                  book={book}
                  idx={idx}
                />
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
