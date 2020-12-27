import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, Container, Jumbotron } from "react-bootstrap";
import NavAdmin from "./componentsAdmin/NavAdmin";
import FooterAdmin from "./componentsAdmin/FooterAdmin";
import FormAdmin from "./componentsAdmin/FormAdmin";
import Listado from "./componentsAdmin/Listado";
import CardView from "./componentsAdmin/CardView";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "../App.css";
import Ventas from "./componentsAdmin/Ventas";
import ListUser from "./componentsAdmin/ListUser";
import Turnos from "./componentsAdmin/Turnos";

export default function IndexAdmin({
  traerProductos,
  setBanderaTicket,
  ticket,
  setTicket,
  turnoxDia,
  turnos,
  setTurnos,
  producto,
  setProducto,
  setToken,
  token,
  productos,
  setProductos,
  user,
  setBanderaProductos,
  paginacionProductos,
  setPaginacionProductos,
  prod,
  setProd
}) {
  useEffect(() => {
    traerTicket();
  }, []);
  const traerTicket = async () => {
    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/ticket",
      {
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
      }
    );
    const respuesta = await solicitud.json();
    setTicket(respuesta);
  };

  //setBanderaTicket(true);

  const [modificacion, setModificacion] = useState(false);
  const [cantidad, setCantidad] = useState(null);
  const [bandera, setBandera] = useState(true);
  const [cambiosProductos, setCambiosProductos] = useState(true);

  return (
    <Fragment>
      <Container fluid>
        <Container>
          <Router>
            <NavAdmin setToken={setToken} />
            <Jumbotron>
              <h1>Hello, Administrador!</h1>
              <p>
                Desde aquí podras dar de alta a tus productos en la Tienda, ver
                tus turnos por dia y por semana, ver tus ventas...
              </p>
            </Jumbotron>

            <Switch>
              <Route exact path="/user">
                <ListUser
                  turnoxDia={turnoxDia}
                  turnos={turnos}
                  setTurnos={setTurnos}
                  user={user}
                />
              </Route>
              <Route path="/Turnos">
                <Turnos
                  turnoxDia={turnoxDia}
                  turnos={turnos}
                  setTurnos={setTurnos}
                  user={user}
                />
              </Route>
              <Route path="/Tickets">
                <Ventas ticket={ticket} />
              </Route>

              <Route path="/Admin">
                <Row>
                  <Col sm={8}>
                    <FormAdmin
                      prod={prod}
                      setProd={setProd}
                      producto={producto}
                      setProducto={setProducto}
                      productos={productos}
                      setProductos={setProductos}
                      modificacion={modificacion}
                      setModificacion={setModificacion}
                      cantidad={cantidad}
                      setCantidad={setCantidad}
                      bandera={bandera}
                      setBandera={setBandera}
                      token={token}
                      setBanderaProductos={setBanderaProductos}
                      
                    />
                  </Col>
                  <Col sm={4}>
                    <CardView
                      producto={producto}
                      productos={productos}
                      cantidad={cantidad}
                      setCantidad={setCantidad}
                      bandera={bandera}
                      setBandera={setBandera}
                    />
                  </Col>
                </Row>
                <Row>
                  {
                    <Listado
                      traerProductos={traerProductos}
                      prod={prod}
                      setProd={setProd}
                      setBanderaProductos={setBanderaProductos}
                      token={token}
                      producto={producto}
                      setProducto={setProducto}
                      productos={productos}
                      setProductos={setProductos}
                      modificacion={modificacion}
                      setModificacion={setModificacion}
                      setBanderaProductos={setBanderaProductos}
                      paginacionProductos={paginacionProductos}
                      setPaginacionProductos={setPaginacionProductos}
                    />
                  }
                </Row>
              </Route>
            </Switch>
          </Router>
        </Container>
      </Container>
    </Fragment>
  );
}
