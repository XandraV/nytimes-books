// import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
// import { nytimes } from "./nytimes";

// function BooksTable(props) {
//   const [books, setBooks] = useState([]);
//   useEffect(() => {
//     fetch(
//       `${nytimes.base_url}/svc/books/v3/lists/current/${props.category}.json?api-key=${nytimes.api_key}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status) setBooks(data["results"]["books"]);
//       });
//   });

//   return (
//     <Table striped borderless hover size="sm" style={{ textAlign: "center" }}>
//       <thead>
//         <tr>
//           <th>Rank</th>
//           <th></th>
//           <th>Author</th>
//           <th>Title</th>
//         </tr>
//       </thead>
//       <tbody>
//         {books.slice(0, 10).map((book) => (
//           <tr key={book.title}>
//             <td>{book.rank}</td>
//             <td>
//               <img alt="" height={30} src={book.book_image} />
//             </td>
//             <td>{book.author}</td>
//             <td>{book.title.charAt(0) + book.title.slice(1).toLowerCase()}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// }

// export default BooksTable;
