import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link } from "react-router-dom";

export default function NavAdmin({ setToken }) {
  return (
    <Container fluid className="d-flex justify-content-around nav-info">
      <Navbar expand="md">
        <Navbar.Brand href="/Admin">
          <i className="fas fa-dumbbells patita1">
            <span className="text-dark">Gimnasio</span>
          </i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            {/* RUTAS DE ACCESO */}

            <Link to="/Admin" className="nav-link text-dark">
              Productos
            </Link>
            <Link to="/User" className="nav-link text-dark">
              Usuarios
            </Link>
            <Link to="/Turnos" className="nav-link text-dark">
              Turnos
            </Link>
            <Link to="/Tickets" className="nav-link text-dark">
              Ventas
            </Link>
            <a href="/#" className="nav-link text-dark">
              Home
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
