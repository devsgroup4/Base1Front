import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <Container fluid className="nav-info2">
      <Container>
        <Row>
          <Col className="d-flex flex-row">
           <div>
            <p className="carrito text-light mt-2">
              <i className="fa fa-phone-square"></i> Tel de contacto: +54 9
              (0381) 155 889 431
            </p>
            </div>
            </Col>
            <Col>
            <div>
            <p className="carrito text-light mt-2">
              <i className="fa fa-home"></i> Dirección: San Martin 2338 - San
              Miguel de Tucumán, Tucumán - Argentina.
            </p>
           </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2 mb-2 text-light">
          <h6>&copy; Grupo Giro. Todos los derechos reservados</h6>
        </Row>
      </Container>
    </Container>
  );
}
