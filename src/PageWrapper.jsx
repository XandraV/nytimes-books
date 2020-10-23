import React from "react";
import styled from "styled-components/macro";
const StyledPageWrapper = styled.div`
  text-align: center;
  nav > a.nav-link.active,
  nav > a.nav-link {
    color: black;
    background-color: #fde8d1;
    border-bottom: 1px solid #ffffff;
  }
  nav > a.nav-link.active {
    border-color: #ffffff;
    border-bottom: transparent;
  }
  nav {
    border-bottom: 1px solid #ffffff;
  }
`;

const PageWrapper = (props) => (
  <StyledPageWrapper>{props.children}</StyledPageWrapper>
);
export default PageWrapper;
