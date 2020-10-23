import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import chroma from "chroma-js";

function RankingChart() {
  const loading = useSelector((state) => state.books.loading);
  const books = useSelector((state) => state.books.books);
  const error = useSelector((state) => state.books.error);
  const chartData = books.slice(0, 10);
  return (
    <>
      {loading && <p>Loading...</p>}
      {books.length > 0 && !loading && (
        <svg width={window.innerWidth / 2} height={200}></svg>
      )}
      {error && error.message}
    </>
  );
}

export default RankingChart;
