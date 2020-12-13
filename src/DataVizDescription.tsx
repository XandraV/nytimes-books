import React, {useContext} from "react";
import styled from "styled-components/macro";
import { ThemeContext } from "./ThemeProvider";

const StyledSVG = styled.svg`
  margin-top: -2rem;
  @-webkit-keyframes flip-in-hor-bottom {
    0% {
      -webkit-transform: rotateX(80deg);
      transform: rotateX(80deg);
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0);
      transform: rotateX(0);
      opacity: 1;
    }
  }
  @keyframes flip-in-hor-bottom {
    0% {
      -webkit-transform: rotateX(80deg);
      transform: rotateX(80deg);
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0);
      transform: rotateX(0);
      opacity: 1;
    }
  }

  -webkit-animation: flip-in-hor-bottom 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
  animation: flip-in-hor-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s
    both;
`;
const DataVizDescription = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="title-main mb-3">
        Top 15 Best Selling Books in Category: Fiction
      </div>
      <div className="ml-4">
        <div className="title-sub mb-2">Reading the data visualisation</div>
        <div className="rank mb-1">
          <svg width={10} height={10}>
            <rect width={10} height={10} fill={"#FF94BD"} rx={3} ry={3} />
          </svg>{" "}
          rank this week
        </div>
        <div className="rank">
          <svg width={10} height={10}>
            <rect width={10} height={10} fill={"#ffffffa8"} rx={3} ry={3} />
          </svg>{" "}
          rank last week
        </div>
      </div>
      <StyledSVG width={200} height={230}>
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
        <circle cx={60} cy={100} r={2} fill={"white"} />
        <circle cx={43} cy={100} r={2} fill={"white"} />
        <circle cx={25} cy={100} r={2} fill={"white"} />
        <path
          d="M 60 100
           L 60 170
           L 100 170"
          stroke="white"
          fill={"none"}
          strokeWidth="1"
        />
        <path
          d="M 43 100
        L 43 190
        L 100 190"
          stroke="white"
          fill={"none"}
          strokeWidth="1"
        />
        <path
          d="M 25 100
        L 25 210
        L 100 210"
          stroke="white"
          fill={"none"}
          strokeWidth="1"
        />
        <text fill={theme.color} textAnchor="middle" x={145} y={172} fontSize={12}>
          rank this week
        </text>
        <text fill={theme.color} textAnchor="middle" x={142} y={192} fontSize={12}>
          weeks on list
        </text>
        <text fill={theme.color} textAnchor="middle" x={149} y={212} fontSize={12}>
          title of the book
        </text>
      </StyledSVG>
    </>
  );
};

export default DataVizDescription;
