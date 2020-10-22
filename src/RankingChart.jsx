import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import { nytimes } from "./nytimes";

function RankingChart(props) {
  const [books, setBooks] = useState([]);
  // useEffect(() => {
  //   fetch(
  //     `${nytimes.base_url}/svc/books/v3/lists/current/${props.category}.json?api-key=${nytimes.api_key}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status) setBooks(data["results"]["books"]);
  //     });
  // });

  return (
   <svg width={window.innerWidth/2} height={200} ></svg>
  );
}

export default RankingChart;
