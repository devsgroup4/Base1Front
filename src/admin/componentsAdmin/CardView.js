import React, { Fragment } from "react";
import { Card, Button, Form, Container, Col } from "react-bootstrap";
import Imagenes from "./Imagenes";

export default function CardView({
  producto,
  productos,
  cantidad,
  setCantidad,
}) {
  return (
    <Fragment>
      <Container className="d-flex align-self-center p-0 ml-3">
        <Card className="text-center m-2  align-self-center">
          <h5 className="text-center text-success">
            {producto.nombreProducto}
          </h5>
          <Card.Img variant="top" />
          <Imagenes producto={producto} />
          <Card.Body>
            <Col>
              <p className="textarea"> {producto.descripcion}</p>
            </Col>
            <h5 variant="success">Precio: ${producto.precio}</h5>
            <p className="text-warning">Stock:{producto.stock} un.</p>
            <Form inline className="d-flex justify-content-center">
              <Form.Control
                type="number"
                min="0"
                size="sm"
                max="999"
                placeholder="Cantidad"
                name="cantidad"
                id="cantidad"
                className="w-75 d-flex"
              />
              <Button
                className="mx-2 nav-info w-75 mt-1"
                disabled
                size="sm"
                size="sm"
                variant="danger"
              >
                Añadir Producto{" "}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
