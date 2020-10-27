import React from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import chroma from "chroma-js";

const svgHeight = 390;
const svgWidth = 500;

const color = chroma
  .scale(["#f6b7a2", "#ddacca", "#b9a6e8", "#86a1ff"])
  .domain([0, 10]);

const xScale = d3
  .scaleLinear()
  .domain([0, 11])
  .range([20, (2 * svgWidth) / 3]);
const yScale = d3.scaleLinear().domain([0, 10]).range([svgHeight, 0]);

function RankingChart() {
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <svg
          width={svgWidth}
          height={svgHeight}
          style={{ overflow: "visible", marginTop: "30px" }}
        >
          <path
            d={["M", 10, svgHeight, "h", 0, "H", svgWidth, "v", 0].join(" ")}
            stroke="#e6e6e9"
            strokeWidth="0.1rem"
          />
          <path
            d={["M", 10, svgHeight, "v", 0, "V", 10, "v", 6].join(" ")}
            fill="none"
            stroke="lightgrey"
          />

          {chartData.map((book, idx) => {
            const change = book["rank"] - book["rankLastWeek"] > 0;
            return (
              <g>
                <g key={idx} transform={`translate(-10,${yScale(idx) + 5})`}>
                  <path
                    d={[
                      "M",
                      20,
                      -30,
                      "L",
                      xScale(book["rank"]),
                      -30,
                      "C",
                      xScale(book["rank"]),
                      change ? -20 : -30,
                      change ? xScale(book["rank"] / 2) : xScale(book["rank"]),
                      change ? -30 : -15,
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
                    cx={xScale(book["rank"])}
                    cy={-30}
                    r={8}
                    fill={color(idx).saturate(4)}
                    opacity={0.5}
                  />
                  <circle
                    cx={xScale(book["rankLastWeek"])}
                    cy={-10}
                    r={4}
                    fill={color(idx).saturate(4)}
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
                <g key={idx} transform={`translate(-10,${yScale(idx)})`}>
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
