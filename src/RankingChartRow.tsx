import React, { FC, useState } from "react";
import ChartInfo from "./ChartInfo";
import * as d3 from "d3";
import chroma from "chroma-js";

type RankingChartRowProps = {
  book: {
    title: string;
    rank: number;
    rankLastWeek: number;
    weeksOnList: number;
  };
  idx: number;
  width: number;
  height: number;
};

const color = chroma.scale(["#f08080", "#c3dbba", "#ffd1a1"]).domain([0, 10]);

const RankingChartRow: FC<RankingChartRowProps> = ({
  book,
  idx,
  width,
  height,
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const change = book["rank"] - book["rankLastWeek"] > 0;

  const yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([11, 0])
    .range([20, width / 2]);

  const handleClick = () => {
    const lol = !clicked;
    setClicked(lol);
  };
  return (
    <g
      key={`current-${idx}`}
      transform={`translate(-10,${yScale(idx)! + 10})`}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleClick()}
    >
      {clicked && (
        <>
          // background shadow/highlight for hovered row
          <rect
            transform={`translate(0, -45)`}
            width={630}
            height={50}
            fill={"#fff2d2"}
            rx={3}
            ry={3}
          />
          // info text in the middle of the chart on hover
          <ChartInfo hoveredPoint={book} />
        </>
      )}
      {hovered && (
        <>
          // background shadow/highlight for hovered row
          <rect
            transform={`translate(0, -45)`}
            width={630}
            height={50}
            fill={"#fff2d2"}
            rx={3}
            ry={3}
          />
          // info text in the middle of the chart on hover
          <ChartInfo hoveredPoint={book} />
        </>
      )}
      {new Array(book.weeksOnList).fill(0).map((z, idx2) => (
        // visualisation of weeks on list, right side of the chart
        <rect
          key={`cube-${idx2}`}
          transform={`translate(${600 - idx2 * 12}, -30)`}
          width={10}
          height={20}
          fill={`${color(idx)}`}
          rx={3}
          ry={3}
        />
      ))}
      // shape for the rank of individual books
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
          change ? -20 : -15,
          change ? xScale(book["rank"]) : xScale(book["rank"]*1.2),
          change ? -30 : -25,
          xScale(book["rankLastWeek"] > 10 ? 10 : book["rankLastWeek"]),
          -10,
          "L",
          20,
          -10,
          "Z",
        ].join(" ")}
        fill={`${color(idx+1)}`}
        stroke={`${color(idx+1)}`}
        strokeWidth="0.1rem"
      />
      <circle
        key={`current-point-${idx+1}`}
        cx={xScale(book["rank"])}
        cy={-35}
        r={8}
        fill={`${(color(idx+1) as any).saturate(2)}`}
        opacity={0.5}
      />
      <circle
        key={`previous-point-${idx+1}`}
        cx={xScale(book["rankLastWeek"] > 10 ? 10 : book["rankLastWeek"])}
        cy={-10}
        r={4}
        fill={`${(color(idx+1) as any).saturate(2)}`}
        opacity={0.5}
      />
    </g>
  );
};

export default RankingChartRow;
