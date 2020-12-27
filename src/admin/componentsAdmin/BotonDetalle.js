import React, { useState } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  Table,
  Form,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import moment from "moment";
export default function BotonDetalle({ item, show, handleClose }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket de venta :</Modal.Title>
          <Row>
            <Col>
              <p>
                {item ? item.userid.nombre : ""}{" "}
                {item ? item.userid.apellido : ""}
              </p>
            </Col>
            <Col>
              <h6>
                {item ? moment(item.fechaCompra).format("YYYY-MM-DD") : ""}
              </h6>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>SubTotal</th>
              </tr>
            </thead>

            <tbody>
              {item
                ? item.detalle.map((i) => (
                    <tr key={item._id}>
                      <td>{i.nombre}</td>
                      <td>{i.cantidad}</td>
                      <td>{i.precio}</td>

                      <td>{i.total}</td>
                    </tr>
                  ))
                : null}
            </tbody>
            {item ? <h3 className="float-left">Total:{item.totalSale}</h3> : ""}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
