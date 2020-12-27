import React from "react";
import { Card } from "react-bootstrap";
import "../../App.css";

export default function Imagenes({ producto }) {
  const { imgBase64 } = producto;
  return (
    <img
      variant="top"
      className="fotoCarrito"
      src={imgBase64 ? imgBase64 : "https://via.placeholder.com/300px300"}
    />
  );
}
