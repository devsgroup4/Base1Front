import React, { useState } from "react";
import Carrito_Total from "./Carrito_Total";
import {
  Row,
  Col,
  Tabs,
  Tab,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import Tarjeta from "./Tarjeta";
import swal from "sweetalert";
import { useEffect } from "react";
import BotonDetalle from "../../admin/componentsAdmin/BotonDetalle";
import moment from "moment";
import imagen from "../img/pagos.png";
export default function Carrito({
  usuarioAuth,
  setBanderaTicket,
  setTickets,
  ticket,
  setTicket,
  token,
  suma,
  setSuma,
  articulos,
  setArticulos,
  compras,
  setCompras,
  carrito,
  setCarrito,
  producto,
  setProducto,
  productos,
  SetProductos,
  setBanderaProductos,
}) {
  const [ver, setVer] = useState(null);
  const [show, setShow] = useState(false);
  const [ticketUser, setTicketUser] = useState([]);
  const [bandera, setBandera] = useState(true);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (ticket.length) {
      setTicketUser([
        ...ticket.filter((item) => item.userid._id == usuarioAuth._id),
      ]);
    }
  }, []);

  const handleChange = (e) => {
    setCarrito({ ...carrito, domicilioEnvio: e.target.value });
  };
  const [StockMod, setStockMod] = useState([]);

  const handlePago = async (e) => {
    e.preventDefault();

    if (!carrito.domicilioEnvio) {
      swal(
        "¡ Requerido! ",
        " ... ¡El campo domicilio es extrictamente requerido! "
      );
    }
    let resp = window.confirm("¿Esta seguro que desea confirmar su pago?");
    if (resp) {
      const PostTicket = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/ticket/",
        {
          method: "POST",
          body: JSON.stringify(carrito),
          headers: {
            "Content-Type": "application/json",
            "x-token": token,
          },
        }
      );
      const respuesta = await PostTicket.json();

      if (PostTicket.ok) {
        setTickets(carrito);

        carrito.detalle.map((compra) => {
          let Encontrado = [
            ...productos.filter((prod) => prod._id === compra._id),
          ];
          let stockTotal = Encontrado[0].stock - compra.cantidad;
          let objeto = {
            ...productos.filter((prod) => prod._id === compra._id),
          };

          let objetoMod = { ...objeto, stock: stockTotal };

          putStock(compra._id, objetoMod);
          setBanderaTicket(true);

          setEventKey("pago");
        });
      }
    }
  };

  const putStock = async (a, b) => {
    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/producto/" + a,
      {
        method: "PUT",
        body: JSON.stringify(b),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setBanderaProductos(true);
  };

  const [eventKey, setEventKey] = useState("profile");

  return (
    <div>
      <div className="border-buttom p-5 mt-2 mb-1 text-dark ">
        <h6>
          Pasos para tu compra :
          <i className="fa fa-shopping-bag patita1 ml-3"></i>
        </h6>
      </div>
      <Row>
        <Card className="m-auto p-5 m-3">
          <Col>
            <Tabs
              ActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mt-5 mb-3 fuente nav-info m-auto "
            >
              <Tab
                eventKey={eventKey}
                className="mb-5  "
                title="Paso1 : Compra"
              >
                <div className="mb-5"></div>
                <Carrito_Total
                  setEventKey={setEventKey}
                  suma={suma}
                  setSuma={setSuma}
                  articulos={articulos}
                  setArticulos={setArticulos}
                  compras={compras}
                  setCompras={setCompras}
                  carrito={carrito}
                  setCarrito={setCarrito}
                />
              </Tab>
              <Tab
                eventKey="domicilio"
                title="Paso 2 : Domicilio de envio"
                className="fuente"
              >
                <div className="mb-5"></div>
                <h3 className="border-buttom fuente mt-5">
                  Domicilio de Envio
                </h3>
                <Form className="mt-3 text-dark" onSubmit={handlePago}>
                  <Form.Group>
                    <Form.Label>Dirección:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su domicilio"
                      name="domicilioEnvio"
                      value={carrito.domicilioEnvio}
                      className="w-50"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Provincia:</Form.Label>
                      <Form.Control as="select" defaultValue="Choose...">
                        <option>Seleccione</option>
                        <option value="Buenos Aires">Bs. As.</option>
                        <option value="Catamarca">Catamarca</option>
                        <option value="Chaco">Chaco</option>
                        <option value="Chubut">Chubut</option>
                        <option value="Cordoba">Cordoba</option>
                        <option value="Corrientes">Corrientes</option>
                        <option value="Entre Rios">Entre Rios</option>
                        <option value="Formosa">Formosa</option>
                        <option value="Jujuy">Jujuy</option>
                        <option value="La Pampa">La Pampa</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Mendoza">Mendoza</option>
                        <option value="Misiones">Misiones</option>
                        <option value="Neuquen">Neuquen</option>
                        <option value="Rio Negro">Rio Negro</option>
                        <option value="Salta">Salta</option>
                        <option value="San Juan">San Juan</option>
                        <option value="San Luis">San Luis</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Santa Fe">Santa Fe</option>
                        <option value="Sgo. del Estero">Sgo. del Estero</option>
                        <option value="Tierra del Fuego">
                          Tierra del Fuego
                        </option>
                        <option value="Tucuman">Tucuman</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Localidad:</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese su localidad"
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Código postal:</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese su código postal"
                        className="w-50"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Button
                    variant="primary"
                    className="float-right mb-5 orange"
                    type="submit"
                  >
                    Siguiente
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="pago" title="Forma de Pago">
                <div className="mb-5"></div>
                <Tarjeta
                  setSuma={setSuma}
                  setCarrito={setCarrito}
                  setArticulos={setArticulos}
                  carrito={carrito}
                />
              </Tab>
            </Tabs>
          </Col>
          <div className="mb-5"></div>
        </Card>
        <Col>
          <Card className="  mb-3 p-1">
            <Card.Body className="mt-3">
              <Card className="m-auto mt-3 p-3">
                <i className="fa fa-history  m-auto mt-3 mb-3"> </i>
                <h4 className="m-auto">Historial de compras</h4>
              </Card>
              <Card.Text>
                <Table
                  id="dtHorizontalVerticalExample"
                  className="table table-striped table table-sm "
                  cellSpacing="0"
                  width="100%"
                >
                  <thead className="nav-info ">
                    <tr className="font">
                      <th>Fecha de compra</th>
                      <th>Monto</th>

                      <th>Detalle</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ticketUser
                      ? ticketUser.map((item) => (
                          <tr key={item.userid._id}>
                            <td>
                              {moment(item.fechaCompra).format("DD-MM-YYYY")}
                            </td>
                            <td>${item.totalSale}</td>

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
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
       
      </Row>
      <img
    
    className=" mb-3"
    src={imagen}
    width="1000"
    height="500"
  />
    </div>
  );
}
