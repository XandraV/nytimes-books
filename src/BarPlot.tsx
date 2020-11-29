import React, { FC, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as d3 from "d3";

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

const BarPlot: FC = () => {
  const loading = useSelector((state: RootState) => state.books.loading);
  const books = useSelector((state: RootState) => state.books.books);
  const error = useSelector((state: RootState) => state.books.error);

  const width = 600;
  const height = 600;
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
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <svg width={width} height={height} style={{marginTop:'-1rem'}}>
          {books.map((d, idx) => {
            console.log(d);
            return (
              <OverlayTrigger
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
                      // textAlign: "center",
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
      )}
      {error && error.message}
    </>
  );
};

export default BarPlot;
