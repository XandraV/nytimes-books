import React from "react";

const DataVizDescription = () => {
  return (
    <svg width={200} height={230}>
      <circle
        cx={75}
        cy={100}
        r={15}
        stroke={"#d3b8ae"}
        strokeWidth={10}
        fill={"none"}
        opacity={0.8}
      />
      <circle
        cx={75}
        cy={100}
        r={33}
        stroke={"#d3b8ae"}
        strokeWidth={10}
        fill={"none"}
        opacity={0.8}
      />
      <circle
        cx={75}
        cy={100}
        r={50}
        stroke={"#bcaaa4"}
        strokeWidth={10}
        fill={"none"}
        opacity={0.8}
      />
      <circle cx={60} cy={100} r={3} fill={"white"} />
      <circle cx={43} cy={100} r={3} fill={"white"} />
      <circle cx={25} cy={100} r={3} fill={"white"} />
      <path
        d="M 60 100
           L 60 170
           L 100 170"
        stroke="white"
        fill={"none"}
        stroke-width="1"
      />
      <path
        d="M 43 100
        L 43 190
        L 100 190"
        stroke="white"
        fill={"none"}
        stroke-width="1"
      />
      <path
        d="M 25 100
        L 25 210
        L 100 210"
        stroke="white"
        fill={"none"}
        stroke-width="1"
      />
      <text
        textAnchor="middle"
        x={145}
        y={172}
        fontSize={12}
      >
        rank this week
      </text>
      <text
        textAnchor="middle"
        x={142}
        y={192}
        fontSize={12}
      >
        weeks on list
      </text>
      <text
        textAnchor="middle"
        x={149}
        y={212}
        fontSize={12}
      >
        title of the book
      </text>
    </svg>
  );
};

export default DataVizDescription;
