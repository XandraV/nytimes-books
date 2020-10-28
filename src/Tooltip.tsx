import React, { FC } from "react";

type TooltipProps = {
  hoveredPoint: { book: { title: string; rank: string; rankLastWeek: string } };
};

const Tooltip: FC<TooltipProps> = ({ hoveredPoint }) => {
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
        {hoveredPoint.book.title}
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          transform: "translate(50px,35px)",
          fill: "grey",
        }}
      >
        {`#${hoveredPoint.book.rank} this week`}
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          transform: "translate(50px,50px)",
          fill: "grey",
        }}
      >
        {`#${hoveredPoint.book.rankLastWeek} last week`}
      </text>
    </g>
  );
};

export default Tooltip;
