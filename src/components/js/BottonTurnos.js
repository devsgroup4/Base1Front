import React, { useState, useRef } from "react";
import { Row, Col, Button, Overlay, Popover, Form } from "react-bootstrap";

export default function BottonTurnos({ arrayDisponible }) {
  const [hora, setHora] = useState();

  const handleChangeSelect = (event) => {};
  let number;
  return (
    <Form.Control
      size="sm"
      className="mt-1 mb-1"
      as="select"
      name="hora"
      onChange={handleChangeSelect}

    >
      <option>Turnos :</option>
      {arrayDisponible.length
        ? arrayDisponible.map((number) => (
            <option value={number}>{number}</option>
          ))
        : ""}
    </Form.Control>
  );
}
