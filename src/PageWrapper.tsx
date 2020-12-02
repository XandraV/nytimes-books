import React, { FC } from "react";
import styled from "styled-components/macro";
const TypingEffect = `
  width:0;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  animation-name: typing;
  animation-duration: 1s; 
  animation-timing-function: steps(60, end); 
  animation-fill-mode: forwards;
  
  /* The typing effect */
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;
const StyledPageWrapper = styled.div`
  margin: 2rem;
  .table {
    float: right;
  }
  .MuiTypography-body1 {
    font-family: inherit;
    font-size: 0.9rem;
  }
  label {
    margin-bottom: 0;
  }
  .MuiIconButton-label {
    color: #d3b8ae;
  }
  .title-main {
    font-weight: bold;
    ${TypingEffect}
  }
  .title-sub {
    font-weight: bold;
    animation-delay: 0.5s;
    ${TypingEffect}
  }
  .rank {
    animation-delay: 0.8s;
    ${TypingEffect}
  }
  .radio {
    @-webkit-keyframes slide-in-left {
      0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slide-in-left {
      0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      0.5s both;
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
  }
  .tooltip-arrow {
    display: none !important;
}
`;

const PageWrapper: FC = ({ children }) => (
  <StyledPageWrapper>{children}</StyledPageWrapper>
);
export default PageWrapper;
