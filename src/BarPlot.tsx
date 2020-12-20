import React, { FC } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import * as d3 from "d3";
import styled from "styled-components/macro";
import chroma from "chroma-js";
type BarPlotProps = {
  books: any;
};
const Wrapper = styled.div`
  div.arrow {
    display: none;
  }
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

  function splitSentence(sentence: string) {
    let first = "";
    let second = "";
    sentence.split(" ").map((word: string) => {
      first.length > 15 ? (second += ` ${word}`) : (first += ` ${word}`);
    });
    return { first, second };
  }
  return (
    <Wrapper>
      <svg
        width={width}
        height={height}
        style={{ overflow: "visible", marginTop: "-1rem" }}
      >
        {books.map((d: any, idx: number) => {
          const { first, second } = splitSentence(d.title);
          return (
            <OverlayTrigger
              key={`bookPlot${idx}`}
              trigger={["hover", "focus"]}
              placement={idx > 7 ? "left" : "right"}
              overlay={
                <Popover
                  id="popover-basic"
                  style={{
                    borderBottomColor: "white",
                    borderWidth: "3px",
                    borderColor: "white",
                    backgroundColor: `${color(idx)}`,
                    maxWidth: "20rem",
                    color: `white`,
                  }}
                >
                  <span className="d-flex p-3">
                    <img alt="" height={150} src={d.book_image} />{" "}
                    <span className="pl-3">
                      <div
                        style={{
                          borderRadius: "0.2rem",
                          padding: "0.2rem",
                          marginBottom: "0.5rem",
                          maxWidth: "6rem",
                          backgroundColor: `${chroma(color(idx)!)
                            .darken(0.5)
                            .saturate(1)}`,
                        }}
                      >
                        #{d.rank} this week
                      </div>
                      <strong>{d.title}</strong>
                      <h6 className="font-italic">by {d.author}</h6>
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
                    175 + d.rank * 24
                  })`}
                >
                  // rotate around the chart
                  <text
                    textAnchor="start"
                    y={outerRadiusWeeks}
                    fontSize={11}
                    transform={`rotate(90, ${xScale(
                      d.rank
                    )} ${outerRadiusWeeks})`} // rotate(a,x,y) rotate around a given point
                  >
                    {first}
                  </text>
                </g>
                <g
                  transform={`translate(${height / 2} ${width / 2}) rotate(${
                    180 + d.rank * 24
                  })`}
                >
                  // rotate around the chart
                  <text
                    textAnchor="start"
                    y={outerRadiusWeeks}
                    fontSize={11}
                    transform={`rotate(86, ${xScale(
                      d.rank
                    )} ${outerRadiusWeeks})`} // rotate(a,x,y) rotate around a given point
                  >
                    {second}
                  </text>
                </g>
                <g
                  transform={`translate(${height / 2} ${width / 2}) rotate(${
                    170 + d.rank * 24
                  })`}
                >
                  <image
                    y={outerRadiusWeeks}
                    href={d.book_image}
                    height="30"
                    width="30"
                  />
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
