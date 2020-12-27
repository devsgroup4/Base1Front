import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./App.css";
import Navegador from "./components/Navegador";
import dotenv from "dotenv";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Conocenos from "./components/js/Conocenos";

import Carrito from "./components/js/Carrito";
import Contacto from "./components/js/Contacto";
import Servicios from "./components/js/Servicios";
import Tienda from "./components/js/Tienda";
import Footer from "./components/Footer";
import IndexAdmin from "./admin/IndexAdmin";
import Turnos from "./components/js/Turnos";
import { animateScroll as scroll } from "react-scroll";
import Registro from "./components/js/Registro";
import Sesion from "./components/js/Sesion";
import MainVideo from "./components/MainVideo";
import video from "../src/components/img/Euk_Homepage_Video.mp4";

function App() {
  const [usuarioAuth, setUsuarioAuth] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [autenticado, setAutenticado] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [prod, setProd] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidoUser, setPedidoUser] = useState(false);
  const [user, setUser] = useState([]);
  const [turnoxDia, setTurnoxDia] = useState();
  const [producto, setProducto] = useState({
    imgBase64: "",
    categoria: "",
    nombreProducto: "",
    descripcion: "",
    precio: "",
    stock: 0,
    cantidad: 0,
  });
  const [carrito, setCarrito] = useState({
    detalle: [],
    userid: "",
    domicilioEnvio: "",
    totalSale: "",
    pago: "",
    fechaCompra: "",
  });
  const [turno, setTurno] = useState({
    motivoTurno: "",
    detalleTurno: "",
    diaHoraTurno: "",
    nombreTurno: "",
    apellidoTurno: "",
    telefonoTurno: "",
  });
  const [BanderaTicket, setBanderaTicket] = useState(true);
  const [BanderaTurnos, setBanderaTurnos] = useState(true);
  const [BanderaProductos, setBanderaProductos] = useState(true);
  const [BanderaProductos1, setBanderaProductos1] = useState(false);
  const [turnos, setTurnos] = useState([]);
  let add = 0;
  let page = null;
  const [search, setSearch] = useState("");
  const [articulos, setArticulos] = useState([]);
  const [suma, setSuma] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [paginacionProductos, setPaginacionProductos] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [encontrado, setEncontrado] = useState(null);
  const [ModalShow, setModalShow] = useState(false);
  
  useEffect(() => {
    console.log("articulos en app",articulos)
    articulos.map(art => {
      add = parseFloat(art.total) + add;
    });
    setSuma(add);
  }, [articulos]);

  useEffect(() => {
    traerUser();
  }, [token]);
  useEffect(() => {
    if (BanderaTurnos) {
      traerTurnos();
      Turnosxdia();
      setBanderaTurnos(false);
    }
  }, [BanderaTurnos]);

  useEffect(() => {
    if (BanderaProductos) {
      traerProductos();
      traerTodoslosProd();
      setBanderaProductos(false);
    }
  }, [BanderaProductos]);

  useEffect(() => {
    if (BanderaProductos1) {
      traerProd();
      setBanderaProductos1(false);
    }
  }, [BanderaProductos1]);

  const traerTurnos = async () => {
    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/turno/",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (solicitud.ok) {
      const respuesta = await solicitud.json();

      setTurnos(respuesta);
    }
  };
  const Turnosxdia = async () => {
    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/turnoxdia/",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (solicitud.ok) {
      const respuesta = await solicitud.json();

      setTurnoxDia(respuesta);
    }
  };

  const traerUser = async () => {
    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/user",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (solicitud.ok) {
      const respuesta = await solicitud.json();
      setUser(respuesta.msg);
    }
  };
  const traerTodoslosProd = async () => {

    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/productosVarios",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (solicitud.ok) {
      const respuesta = await solicitud.json();
      console.log("productos en app",respuesta.prod)
      setProd(respuesta.prod);
    }
  };
  const traerProd = async (page = null) => {
    let url;

    search
      ? (url = process.env.REACT_APP_BACKEND_URL + "/api/productosBusqueda/")
      : (url = process.env.REACT_APP_BACKEND_URL + "/api/productosBusqueda/");
    if (page) {
      url += "?page=" + page;
    }

    if (search) {
      page ? (url += "&search=" + search) : (url += "?search=" + search);
    }
    const solicitud = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    });

    const respuesta = await solicitud.json();

    setProductos(respuesta.productos);

    setPaginacionProductos(respuesta.productos);
    delete respuesta.productos;
    setSearch("");
  };

  const traerProductos = async (page = null) => {
    let url;

    !categoria
      ? (url = process.env.REACT_APP_BACKEND_URL + "/api/productos/")
      : (url = process.env.REACT_APP_BACKEND_URL + "/api/productosCategoria/");
    if (page) {
      url += "?page=" + page;
    }

    if (categoria) {
      page
        ? (url += "&categoria=" + categoria)
        : (url += "?categoria=" + categoria);
    }

    const solicitud = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    });

    const respuesta = await solicitud.json();

    setProductos(respuesta.productos);

    setPaginacionProductos(respuesta.productos);
    delete respuesta.productos;
  };

  useEffect(() => {
    if (BanderaTicket) {
      traerTicket();
      setBanderaTicket(false);
    }
  }, [BanderaTicket]);

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

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      setUsuarioAuth(null);
      setAutenticado(false);
    }
  }, [token]);

  useEffect(() => {
    if (usuarioAuth) {
      localStorage.setItem("user", JSON.stringify(usuarioAuth));
    } else {
      localStorage.removeItem("user");
    }
  }, [usuarioAuth]);

  const [compras, setCompras] = useState([]);
  const [carroTotal, setCarroTotal] = useState(0);
console.log("process.env",process.env.REACT_APP_BACKEND_URL )
/*let scrollTo = () => {
  scrollTo(500);
};*/
  return (
    <Fragment>
      <Router>
        <Switch>
          
        
          <Route path="/Admin">
            {autenticado && !usuarioAuth.isUser ? (
          
              <IndexAdmin
                traerProductos={traerProductos}
                setBanderaTicket={setBanderaTicket}
                setTicket={setTicket}
                ticket={ticket}
                turnoxDia={turnoxDia}
                turnos={turnos}
                setTurnos={setTurnos}
                producto={producto}
                setProducto={setProducto}
                setToken={setToken}
                token={token}
                productos={productos}
                setProductos={setProductos}
                user={user}
                setBanderaProductos={setBanderaProductos}
                paginacionProductos={paginacionProductos}
                setPaginacionProductos={setPaginacionProductos}
                prod={prod}
                setProd={setProd}
              />
            ) : (
              ""
       
            )}
          </Route>

          <Route path="/">  
            <Container fluid className="p-0" style={{ overflow: "hidden" }}>
              
              <Navegador
                ModalShow={ModalShow}
                setModalShow={setModalShow}
                prod={prod}
                setProd={setProd}
                productos={productos}
                suma={suma}
                carroTotal={carroTotal}
                autenticado={autenticado}
                token={token}
                setToken={setToken}
                usuarioAuth={usuarioAuth}
                setUsuarioAuth={setUsuarioAuth}
                setAutenticado={setAutenticado}
                search={search}
                setSearch={setSearch}
                setBanderaProductos1={setBanderaProductos1}
                setSuma={setSuma}
              />
              <MainVideo video={video} />
              <Row>
                <Container className="bg-white">
                  <Route path="/Home/Conocenos">
                    <Conocenos />
                  </Route>
                    
                 
                  <Route exact path="/Home/Servicios">
                    <Servicios />
                  </Route>
                </Container>
                <Route exact path="/Home/Tienda">
                  <Tienda
                    ModalShow={ModalShow}
                    setModalShow={setModalShow}
                    encontrado={encontrado}
                    setEncontrado={setEncontrado}
                    setCategoria={setCategoria}
                    token={token}
                    setBanderaProductos={setBanderaProductos}
                    traerProductos={traerProductos}
                    paginacionProductos={paginacionProductos}
                    setPaginacionProductos={setPaginacionProductos}
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
                    usuarioAuth={usuarioAuth}
                    setToken={setToken}
                    setUsuarioAuth={setUsuarioAuth}
                    setAutenticado={setAutenticado}
                  />
                </Route>
                <Container>
                  <Route exact path="/Home/Contacto">
                    <Contacto />
                  </Route>
                  <Route path="/Home/Cart/">
                    {autenticado ? (
                      <Carrito
                        userioAuth={usuarioAuth}
                        setBanderaTicket={setBanderaTicket}
                        setBanderaProductos={setBanderaProductos}
                        setTickets={setTickets}
                        ticket={ticket}
                        setTicket={setTicket}
                        token={token}
                        suma={suma}
                        setSuma={setSuma}
                        articulos={articulos}
                        setArticulos={setArticulos}
                        compras={compras}
                        setCompras={setCompras}
                        carrito={carrito}
                        setCarrito={setCarrito}
                        productos={prod}
                        setProductos={setProductos}
                        producto={producto}
                        setProducto={setProducto}
                        usuarioAuth={usuarioAuth}
                      />
                    ) : (
                      ""
                    )}
                  </Route>
                  <Route exact path="/Home/Turnos/">
                    <Turnos
                      setBanderaTurnos={setBanderaTurnos}
                      turno={turno}
                      setTurno={setTurno}
                      turnos={turnos}
                      setTurnos={setTurnos}
                    />
                  </Route>
              
                  
                </Container>
                <Footer />
              </Row>
            </Container>
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}
export default App;
