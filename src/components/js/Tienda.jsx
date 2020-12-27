import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Carousel,
  Button,
  Nav,
  Card,
  Navbar,
  ListGroup,
} from "react-bootstrap";
import Card_ViewUser from "./Card_ViewUser";
import Paginacion from "../Paginacion";
import balanced1 from "../img/balanced1.jpg";
import balanced2 from "../img/balanced2.jpg";
import purina1 from "../img/purina1.png";
import { Link } from "react-router-dom";

export default function Tienda({
  ModalShow,
  setModalShow,
  encontrado,
  setEncontrado,
  setCategoria,
  setBanderaProductos,
  traerProductos,
  paginacionProductos,
  suma,
  setSuma,
  articulos,
  setArticulos,
  producto,
  setProducto,
  carrito,
  setCarrito,
  productos,
  setProductos,
  usuarioAuth,

  setToken,
  setUsuarioAuth,
  setAutenticado,
}) {
  const [dolar, setDolar] = useState([]);

  useEffect(() => {
    traerDolar();
  }, []);

  const traerDolar = async () => {
    const solic = await fetch(
      " https://www.dolarsi.com/api/api.php?type=valoresprincipales"
    );

    const Resp = await solic.json();
    setDolar(Resp);
  };

  return (
    <>
      <Container>
        <Carousel>
          <Carousel.Item interval={500}>
            <img className="d-block w-100" src={purina1} alt="First slide" />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={250}>
            <img className="d-block w-100" src={balanced1} alt="Third slide" />
            <Carousel.Caption>
              
            
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" alt="" src={balanced2} />
            <Carousel.Caption className="">
              <h3 className="patita1 text-center"></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container className="mb-5">
        <Row className="mt-5">
          <Col xs={12} lg={2} className="bg-light">
            <div className="container-fluid nav-info justify-content-center mt-3 ">
              <Nav defaultActiveKey="" className="mt-lg-4 d-flex ">
                <div className="container d-flex flex-row flex-wrap flex-lg-column  b-0 m-auto">
                  <Nav.Link
                    onClick={() => {
                      setCategoria("");
                      setBanderaProductos(true);
                      setEncontrado(null);
                    }}
                    className="text-dark"
                  >
                    Todos{" "}
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setCategoria("Nutrilab");
                      setBanderaProductos(true);
                      setEncontrado(null);
                    }}
                    className="text-dark "
                  >
                    Nutrilab
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setCategoria("ENA");
                      setBanderaProductos(true);
                      setEncontrado(null);
                    }}
                    className="text-dark"
                  >
                    ENA
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setCategoria("Nutremax");
                      setBanderaProductos(true);
                      setEncontrado(null);
                    }}
                    className="text-dark"
                  >
                    Nutremax
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setCategoria("Varios");
                      setBanderaProductos(true);
                      setEncontrado(null);
                    }}
                    className="text-dark"
                  >
                    Varios
                  </Nav.Link>
                </div>
              </Nav>
            </div>
          </Col>

          <Col>
            <div className="d-flex flex-wrap justify-content-center">
              {encontrado
                ? encontrado.map((producto) => (
                    <div key={producto._id}>
                      <Card_ViewUser
                        ModalShow={ModalShow}
                        setModalShow={setModalShow}
                        suma={suma}
                        setSuma={setSuma}
                        articulos={articulos}
                        setArticulos={setArticulos}
                        producto={producto}
                        setProducto={setProducto}
                        carrito={carrito}
                        setCarrito={setCarrito}
                        productos={productos}
                        setProductos={setProductos}
                        setToken={setToken}
                        setUsuarioAuth={setUsuarioAuth}
                        setAutenticado={setAutenticado}
                        usuarioAuth={usuarioAuth}
                      />
                    </div>
                  ))
                : productos.Productos
                ? productos.Productos.map((producto) => (
                    <div key={producto._id}>
                      <Card_ViewUser
                        ModalShow={ModalShow}
                        setModalShow={setModalShow}
                        setEncontrado={setEncontrado}
                        suma={suma}
                        setSuma={setSuma}
                        articulos={articulos}
                        setArticulos={setArticulos}
                        articulos={articulos}
                        producto={producto}
                        setProducto={setProducto}
                        carrito={carrito}
                        setCarrito={setCarrito}
                        setToken={setToken}
                        productos={productos}
                        setUsuarioAuth={setUsuarioAuth}
                        setProductos={setProductos}
                        setAutenticado={setAutenticado}
                        usuarioAuth={usuarioAuth}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            {paginacionProductos ? (
              <Paginacion
                paginacionData={productos}
                funcionGetData={traerProductos}
                setBanderaProductos={setBanderaProductos}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}
