import React, { useState } from "react";
import {
  Container,
  Navbar,
  Form,
  Button,
  Nav,
  FormControl,
  Dropdown,
  ButtonGroup,
  Row,
  Col,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Sesion from "./js/Sesion";
import Registro from "./js/Registro";
import "../App.css";
import logoZeus from "./img/logoZeus.png";
export default function Navegador({
  setBanderaProductos1,
  ModalShow,
  setModalShow,
  prod,
  setprod,
  productos,
  suma,
  carroTotal,
  autenticado,
  token,
  setToken,
  usuarioAuth,
  setUsuarioAuth,
  setAutenticado,
  encontrado,
  setEncontrado,
  search,
  setSearch,
  setSuma,
}) {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false)
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleOnClick = (event) => {
    if (search) {
      setBanderaProductos1(true);
      history.push("/Home/Tienda");
    }
  };

  return (
    <>
      <Container fluid className=" fixed-top container-fluid  m-0 p-0">
        <div className="nav-info1 m-0 p-0">
        <Nav className=" nav-info1 justify-content-between m-0 p-0 d-flex nowrap">
          <div className="d-flex mt-2  ">
             <p className="text-white">Mega Zeus Gym </p>
             <a href="https://www.google.com.ar/maps/place/Gimnasio+Mega+Zeus/@-26.8229882,-65.2326073,3a,75y,103.34h,92.2t/data=!3m7!1e1!3m5!1s00uPnUkbn8CCOGcW7oRntA!2e0!6s%2F%2Fgeo2.ggpht.com%2Fcbk%3Fpanoid%3D00uPnUkbn8CCOGcW7oRntA%26output%3Dthumbnail%26cb_client%3Dsearch.gws-prod.gps%26thumb%3D2%26w%3D86%26h%3D86%26yaw%3D161.91788%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656!4m5!3m4!1s0x94225c5e9decb8d5:0x2c7cfa4ee2c70971!8m2!3d-26.8230625!4d-65.2325771" target="blank">
                <i className="fas fa-map-marker-alt fuente pl-1 mr-1"></i>
              </a>
              <p className="mx-2 fuente">||</p>
              <a href="https://www.facebook.com/megazeusgym" target="blank">
                <i className="fab fa-facebook-square fuente  pl-1 mr-1"></i>
              </a>
              <a href="https://www.youtube.com/watch?v=zdnbrUkgPUE" target="blank">
                <i className="fab fa-youtube-square  mr-1 fuente"></i>
              </a>
              <a href="https://www.instagram.com/megazeusgym/" target="blank">
                <i className="fab fa-instagram-square mr-1 fuente"></i>
              </a>
            </div>
              
            <div className="  d-inline">
                      <div className="d-flex nowrap">
                      <Nav.Link
                        onClick={() => setModalShow(true)}
                        className="nav-link  text-white"
                      >
                        {usuarioAuth ? "" : "Login || Registro"}
                      </Nav.Link>
                      <Sesion
                        setModalShow={setModalShow}
                        show={ModalShow}
                        onHide={() => setModalShow(false)}
                        setToken={setToken}
                        setUsuarioAuth={setUsuarioAuth}
                        setAutenticado={setAutenticado}
                      />
                     
                        {autenticado ? (
                          <Dropdown className="text-warning  b-0 d-inline ml-2 mr-4 ">
                            <Dropdown.Toggle
                              id="dropdown-basic"
                              variant="nav-link"
                              className=" btnsesion text-warning m-0  d-inline"
                            >
                              <i className="far fa-user link orange1   ml-1 "></i>{" "}
                              <p className="d-inline">
                                Hola {usuarioAuth.nombre}!
                              </p>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="nav-info butnsesion  b-0">
                              <Button
                                variant="link"
                                className="text-warning  b-0 m-0 "
                                onClick={() => {
                                  setToken(null);
                                  setSuma(0);
                                }}
                              >
                                Cerrar Sesion
                              </Button>
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : (
                          ""
                        )}

                          </div>
                          </div>

                      {!autenticado ? (
                        <Redirect to="/" />
                      ) : (
                        () => setModalShow(false)
                      )}
                      
            
          </Nav>
          </div>
          <Nav className="nav-info2 d-flex  nowrap">
        
            
              <Col className="col-2">
           <img className="mt-2" src={logoZeus} width="50px" height="40px"></img>
           </Col>
           <Col className="col-8">
           <Form className="d-flex nowrap  mt-3 mb-1">
              <FormControl
                type="text"
                placeholder="Buscar productos,categorias,etc ..."
                className=""
                name="search"
                value={search}
                id="buscarProducto"
                onChange={handleChange}
              ></FormControl>
              <Button variant="src-header" onClick={handleOnClick}>
                <i className="fas fa-search lupa"></i>
              </Button>
            </Form>
            </Col>
            <Col className="mt-2 col-2 ">
            <Link
                          to="/Home/Cart/"
                          className="text-white d-inline float-right"
                          title="Ir a mis compras"
                        >
                          {!autenticado ? (
                            <Nav.Link
                              onClick={() => setModalShow(true)}
                              className="nav-link  text-white  d-flex"
                            >
                              <i className="fas fa-shopping-cart text-white patita2 mr-1 mt-1 "></i>
                              <p className="text-light inline ">${suma}</p>
                              
                            </Nav.Link>
                          ) : (
                            <Link
                              to="/Home/Cart/"
                              className="nav-link  text-white "
                            >
                              <i className="fas fa-shopping-cart text-white patita2 mr-1"></i>
                                <p className="text-light ">${suma}</p>
                              
                            </Link>
                          )}
                          
                        </Link>
                       

            </Col>
           
          
          </Nav>
        <Row
          className="
          d-flex justify-content-center bg-light "
        >
          <Col className="col-3">
          </Col>
          <Col className="col-9 ">
            <Navbar expand="lg" className="bg-light" collapseOnSelect expanded={expanded}>
              <Navbar.Brand>
                <Link to="/Home" className="nav-link m-0">
                  
                  {/* <span className="text-dark m-0 p-0"> Mega Zeus Gym</span>*/}
                  
                </Link>{" "}
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav "
                className=""
                onClick={()=>!expanded? setExpanded(true):setExpanded(false)}
              />

              <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className=" mr-5 navbar-light bg-light " >
                  <div className=" d-flex flex-column flex-lg-row ">
                    <div className="mt-1 d-flex flex-column flex-lg-row" onClick={()=>setExpanded(false)}>
                     <Nav.Link className="">
                      <Link
                        to="/Home/Conocenos"
                        className="nav-link   d-inline"
                      >
                        Conocenos{" "}
                      </Link></Nav.Link>
                      <Link
                        to="/Home/Servicios"
                        className="nav-link   d-inline"
                      >
                        Servicios{" "}
                      </Link>
                      <Link
                        to="/Home/Tienda"
                        className="nav-link  d-inline"
                      >
                        Tienda{" "}
                      </Link>
                      <Link
                        to="/Home/Contacto"
                        className="nav-link   d-inline"
                      >
                        Contacto{" "}
                      </Link>
                      <Link
                        to="/Home/Turnos"
                        className="nav-link  d-inline"
                      >
                        Turnos{" "}
                      </Link>

                      {autenticado && !usuarioAuth.isUser ? (
                        <Link to="/Admin" className="nav-link  ">
                          Admin
                        </Link>
                      ) : (
                        ""
                      )}
                      <Nav.Link
                        onClick={() => setModalShow(true)}
                        className="nav-link  "
                      >
                        {usuarioAuth ? "" : ""}
                      </Nav.Link>
                      <Sesion
                        setModalShow={setModalShow}
                        show={ModalShow}
                        onHide={() => setModalShow(false)}
                        setToken={setToken}
                        setUsuarioAuth={setUsuarioAuth}
                        setAutenticado={setAutenticado}
                      />
                      {!autenticado ? (
                        <Redirect to="/" />
                      ) : (
                        () => setModalShow(false)
                      )}
                    </div>
                    <div className="mt-2 p-2 d-inline">
                      <div className="d-flex nowrap">
                      
                 
                          </div>
                          </div>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>

       
        </Row>
      </Container>
    </>
  );
}
