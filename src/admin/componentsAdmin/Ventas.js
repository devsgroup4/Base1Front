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
import BotonDetalle from "./BotonDetalle";

export default function Ventas({ ticket }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let c = 0;

  const [filtro, setFiltro] = useState({
    desde: "",
    hasta: "",
  });
  const [ver, setVer] = useState(null);
  const [ticketFiltro, setTicketFiltro] = useState([]);
  const handleChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filtro.desde) {
      let fechad = moment(filtro.desde).format("DD-MM-YYYY");
      //let fechah = moment(filtro.hasta).format("DD-MM-YYYY");

      if (fechad) {
        let a = ticket.filter(
          (item) => moment(item.fechaCompra).format("DD-MM-YYYY") == fechad
        );
        setTicketFiltro(a);
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Listado de tickets </h3>

          <Form onSubmit={handleSubmit}>
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                  Username
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Fecha</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroup"
                    placeholder=""
                    type="date"
                    name="desde"
                    value={filtro.desde}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>

              <Col xs="auto">
                <Button type="submit" className="mb-2 btn-warning">
                  <i className="fas fa-filter text-light "></i>
                </Button>
              </Col>
            </Form.Row>
          </Form>

          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <Table
              id="dtHorizontalVerticalExample"
              className="table table-striped table-bordered table-sm "
              cellSpacing="0"
              width="100%"
            >
              <thead className="nav-info ">
                <tr className="font">
                  <th>Ticket</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha de compra</th>
                  <th>Monto</th>
                  <th>Domicilio</th>
                  <th>E-mail</th>
                  <th>Detalle</th>
                </tr>
              </thead>

              <tbody>
                {filtro.desde && ticketFiltro.length > 0
                  ? ticketFiltro.map((item) => (
                      <tr key={item._id}>
                        <td> {c++}</td>
                        <td>{item.userid.nombre}</td>
                        <td>{item.userid.apellido}</td>
                        <td>{moment(item.fechaCompra).format("DD-MM-YYYY")}</td>
                        <td>${item.totalSale}</td>
                        <td>{item.domicilioEnvio}</td>
                        <td>{item.userid.mail}</td>
                        <td>
                          {" "}
                          <Button
                            variant="primary"
                            onClick={() => {
                              setVer(item);
                              setShow(true);
                            }}
                          >
                            Ver mas ...
                          </Button>
                        </td>
                      </tr>
                    ))
                  : ticket.length > 0
                  ? ticket.map((item) => (
                      <tr key={item._id}>
                        <td> {c++}</td>
                        <td>{item.userid.nombre}</td>
                        <td>{item.userid.apellido}</td>
                        <td>{moment(item.fechaCompra).format("DD-MM-YYYY")}</td>
                        <td>${parseFloat(item.totalSale).toFixed(2)}</td>
                        <td>{item.domicilioEnvio}</td>
                        <td>{item.userid.mail}</td>
                        <td>
                          {" "}
                          <Button
                            variant="primary"
                            onClick={() => {
                              setVer(item);
                              setShow(true);
                            }}
                          >
                            Ver mas ...
                          </Button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
            <BotonDetalle
              item={ver}
              show={show}
              handleClose={handleClose}
              ticket={ticket}
            ></BotonDetalle>
          </div>
        </Col>
      </Row>
    </div>
  );
}
