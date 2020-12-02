import React, { FC } from "react";
import styled from "styled-components/macro";
const StyledPageWrapper = styled.div`
  margin: 2rem;
  .title {
    font-weight: bold;
  }
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
`;

const PageWrapper: FC = ({ children }) => (
  <StyledPageWrapper>{children}</StyledPageWrapper>
);
export default PageWrapper;
