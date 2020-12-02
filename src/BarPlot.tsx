import React, { FC } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import * as d3 from "d3";
import styled from "styled-components/macro";
type BarPlotProps = {
  books: any;
};
const Wrapper = styled.div`
  svg {
    @-webkit-keyframes swirl-in-fwd {
      0% {
        -webkit-transform: rotate(-540deg);
        transform: rotate(-540deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
        opacity: 1;
      }
    }
    @keyframes swirl-in-fwd {
      0% {
        -webkit-transform: rotate(-540deg);
        transform: rotate(-540deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
        opacity: 1;
      }
    }

    -webkit-animation: swirl-in-fwd 0.6s ease-out both;
    animation: swirl-in-fwd 0.6s ease-out both;
  }
`;

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

const BarPlot: FC<BarPlotProps> = ({ books }) => {
  const width = 600;
  const height = 560;
  const innerRadiusRanking = 60;
  const outerRadiusRanking = 100;
  const innerRadiusWeeks = 110;
  const outerRadiusWeeks = 160;
  const xScale = d3
    .scaleLinear()
    .domain([1, 16])
    .range([0, 2 * Math.PI]);

  const bandWidth = Math.PI / 7.5;

  const yScaleRanking = d3
    .scaleLinear()
    .domain([1, 16])
    .range([outerRadiusRanking, innerRadiusRanking]);

  const yScaleWeeks = d3
    .scaleLinear()
    .domain([0, 15])
    .range([innerRadiusWeeks, outerRadiusWeeks]);

  const createArc = d3.arc().padAngle(0.05).cornerRadius(3);
  const color = d3
    .scaleLinear<string>()
    .domain([0, 7, 15])
    .range(["#FF94BD", "#C7E2FF", "#FFB846"]);

  return (
    <Wrapper>
      <svg
        width={width}
        height={height}
        style={{ overflow: "visible", marginTop: "-1rem" }}
      >
        {books.map((d:any, idx:number) => {
          return (
            <OverlayTrigger
            key={`bookPlot${idx}`}
              trigger={["hover", "focus"]}
              placement={idx < 5 ? "right" : "left"}
              overlay={
                <Popover
                  id="popover-basic"
                  style={{
                    borderBottomColor: "white",
                    borderWidth: "3px",
                    borderColor: "white",
                    backgroundColor: `${color(idx)}`,
                    maxWidth: "30rem",
                    color: `white`,
                  }}
                >
                  <span className="d-flex p-1">
                    <span>
                      <strong>{d.title}</strong>
                      <div>rank this week: #{d.rank}</div>
                      <div style={{ color: "#ffffffa8", fontSize: 12 }}>
                        rank last week: #{d.rank_last_week}
                      </div>
                      <div>weeks on list: {d.weeks_on_list}</div>
                    </span>
                  </span>
                </Popover>
              }
            >
              <g>
                <g
                  key={`segment${idx}`}
                  transform={`translate(${height / 2} ${width / 2})`}
                >
                  <line
                    transform={`rotate(${12 + 24 * idx})`}
                    x1={0}
                    y1={0}
                    y2={300}
                    stroke={"#E3CDA3"}
                    strokeWidth={1}
                    strokeDasharray={4}
                  />
                  <path
                    className={`arcRank-${idx}`}
                    d={
                      createArc({
                        startAngle: xScale(d.rank)!,
                        endAngle: xScale(d.rank)! + bandWidth / 2,
                        innerRadius: innerRadiusRanking,
                        outerRadius: yScaleRanking(d.rank)!,
                      })!
                    }
                    fill={color(idx)}
                  />
                  <path
                    className={`arcRank-${idx}`}
                    d={
                      createArc({
                        startAngle: xScale(d.rank)! + bandWidth / 2,
                        endAngle: xScale(d.rank)! + bandWidth,
                        innerRadius: innerRadiusRanking,
                        outerRadius: yScaleRanking(
                          d.rank_last_week === 0 ? 11 : d.rank_last_week
                        )!,
                      })!
                    }
                    fill={"#ffffffa8"}
                  />
                  <path
                    className={`arcWeeks-${idx}`}
                    d={
                      createArc({
                        startAngle: xScale(d.rank)!,
                        endAngle: xScale(d.rank)! + bandWidth,
                        innerRadius: innerRadiusWeeks,
                        outerRadius: yScaleWeeks(
                          d.weeks_on_list > 10 ? 10 : d.weeks_on_list
                        )!,
                      })!
                    }
                    fill={color(idx)}
                  />
                </g>
                <g
                  transform={`translate(${height / 2} ${
                    width / 2
                  }) rotate(170)`}
                >
                  <text
                    textAnchor="middle"
                    y={innerRadiusRanking - 5}
                    fontSize={11}
                    transform={`rotate(${d.rank * 24})`}
                  >
                    {d.rank}
                  </text>
                </g>
                <g
                  transform={`translate(${height / 2} ${width / 2}) rotate(${
                    170 + d.rank * 24
                  })`}
                >
                  {" "}
                  // rotate around the chart
                  <text
                    textAnchor="start"
                    y={outerRadiusWeeks}
                    fontSize={11}
                    transform={`rotate(90, ${xScale(
                      d.rank
                    )} ${outerRadiusWeeks})`} // rotate(a,x,y) rotate around a given point
                  >
                    {d.title}
                  </text>
                </g>
              </g>
            </OverlayTrigger>
          );
        })}
      </svg>
    </Wrapper>
  );
};

export default BarPlot;
