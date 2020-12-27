import React from "react";
import { Pagination } from "react-bootstrap";
import "../App.css";

export default function Paginacion({
  paginacionData,
  funcionGetData,
  setBanderaProductos,
}) {
  const {
    hasNextPage,
    hasPrevPage,
    limit,
    nextPage,
    page,
    pagingCounter,
    prevPage,
    totalPages,
  } = paginacionData;

  return (
    <Pagination className="nav-info">
      <Pagination.First
        className="nav-info"
        onClick={() => funcionGetData(1)}
      />
      {hasPrevPage ? (
        <Pagination.Prev
          className="nav-info"
          onClick={() => funcionGetData(prevPage)}
        />
      ) : (
        <Pagination.Prev disabled />
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage ? (
        <Pagination.Next onClick={() => funcionGetData(nextPage)} />
      ) : (
        <Pagination.Next disabled />
      )}
      <Pagination.Last onClick={() => funcionGetData(totalPages)} />
    </Pagination>
  );
}
