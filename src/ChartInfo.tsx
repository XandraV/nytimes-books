import React, { FC } from "react";

type ChartInfoProps = {
  hoveredPoint: { title: string; rank: number; rankLastWeek: number, weeksOnList: number; };
};

const ChartInfo: FC<ChartInfoProps> = ({ hoveredPoint }) => {
  return (
    <g transform={`translate(250,-50)`}>
      <text
        style={{
          fontSize: "0.7rem",
          textAnchor: "middle",
          transform: "translate(50px,20px)",
          fill: "grey",
        }}
      >
        {hoveredPoint.title}
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          transform: "translate(50px,35px)",
          fill: "grey",
        }}
      >
        {`#${hoveredPoint.rank} this week`}
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          transform: "translate(50px,50px)",
          fill: "grey",
        }}
      >
        {`#${hoveredPoint.rankLastWeek} last week`}
      </text>
    </g>
  );
};

export default ChartInfo;
