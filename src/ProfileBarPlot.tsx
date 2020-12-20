import React, { FC, useContext } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import * as d3 from "d3";
import styled from "styled-components/macro";
import chroma from "chroma-js";
import { ThemeContext } from "./ThemeProvider";
type BarPlotProps = {
  books: Array<{
    title: string;
    author: number;
    score: number;
    readTime: number;
  }>;
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
const ProfileBarPlot: FC<BarPlotProps> = ({ books }) => {
  const { theme } = useContext(ThemeContext);
  const booksNum = books.length;
  const width = 500;
  const height = 450;
  const innerRadiusRanking = 60;
  const outerRadiusRanking = 100;
  const innerRadiusWeeks = 110;
  const outerRadiusWeeks = 150;
  const maxScore = 10;
  const xScale = d3
    .scaleLinear()
    .domain([1, booksNum + 1])
    .range([0, 2 * Math.PI]);

  const bandWidth = Math.PI / (booksNum / 2);

  const yScaleRanking = d3
    .scaleLinear()
    .domain([1, maxScore])
    .range([innerRadiusRanking, outerRadiusRanking]);

  const yScaleWeeks = d3
    .scaleLinear()
    .domain([1, booksNum])
    .range([innerRadiusWeeks, outerRadiusWeeks]);

  const createArc = d3.arc().padAngle(0.05).cornerRadius(3);
  const color = d3
    .scaleLinear<string>()
    .domain([0, Math.ceil(booksNum/2), booksNum])
    .range(["#FF94BD", "#C7E2FF", "#FFB846"]);

  function splitSentence(sentence: string) {
    let first = "";
    let second = "";
    sentence
      .split(" ")
      .map((word: string) =>
        first.length > 15 ? (second += ` ${word}`) : (first += ` ${word}`)
      );
    return { first, second };
  }
  return (
    <Wrapper>
      <svg
        width={width}
        height={height}
        style={{ overflow: "visible", marginTop: "-1rem" }}
      >
        {books.map((d: any, index: number) => {
          const { first, second } = splitSentence(d.title);
          let idx = index + 1;
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
                    <span>
                      <strong>{d.title}</strong>
                      <h6 className="font-italic">by {d.author}</h6>
                      <div
                        style={{
                          color: "#ffffffa8",
                          borderRadius: "0.2rem",
                          padding: "0.2rem",
                          maxWidth: "6rem",
                          backgroundColor: `${chroma(color(idx)!)
                            .darken(0.5)
                            .saturate(1)}`,
                        }}
                      >
                        score: {d.score}
                      </div>
                      <div>reading time: {d.readTime}</div>
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
                    transform={`rotate(${(360 / booksNum) * idx})`}
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
                        startAngle: xScale(idx)!,
                        endAngle: xScale(idx)! + bandWidth,
                        innerRadius: innerRadiusRanking,
                        outerRadius: yScaleRanking(d.score)!,
                      })!
                    }
                    fill={color(idx)}
                  />
                  <path
                    className={`arcWeeks-${idx}`}
                    d={
                      createArc({
                        startAngle: xScale(idx)!,
                        endAngle: xScale(idx)! + bandWidth,
                        innerRadius: innerRadiusWeeks,
                        outerRadius: yScaleWeeks(
                          d.readTime > 10 ? 10 : d.readTime
                        )!,
                      })!
                    }
                    fill={color(idx)}
                  />
                </g>
                <g
                  transform={`translate(${height / 2} ${
                    width / 2
                  }) rotate(160)`}
                >
                  <text
                    textAnchor="middle"
                    y={innerRadiusRanking - 10}
                    fontSize={11}
                    transform={`rotate(${idx * (360 / booksNum)})`}
                    fill={theme.color}
                  >
                    {d.score}
                  </text>
                </g>
                <g
                  transform={`translate(${height / 2} ${width / 2}) rotate(${
                    170 + idx * (360 / booksNum) - 10
                  })`}
                >
                  // rotate around the chart
                  <text
                    textAnchor="start"
                    y={outerRadiusWeeks}
                    fontSize={11}
                    transform={`rotate(90, ${xScale(idx)} ${outerRadiusWeeks})`} // rotate(a,x,y) rotate around a given point
                    fill={theme.color}
                  >
                    {first}
                  </text>
                </g>
                <g
                  transform={`translate(${height / 2} ${width / 2}) rotate(${
                    180 + idx * (360 / booksNum)
                  })`}
                >
                  // rotate around the chart
                  <text
                    textAnchor="start"
                    y={outerRadiusWeeks}
                    fontSize={11}
                    transform={`rotate(86, ${xScale(idx)} ${outerRadiusWeeks})`} // rotate(a,x,y) rotate around a given point
                    fill={theme.color}
                  >
                    {second}
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

export default ProfileBarPlot;
