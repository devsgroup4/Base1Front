import React from "react";

import { Container, Navbar } from "react-bootstrap";

export default function FooterAdmin() {
  return (
    <Container fluid className="nav-info mt-5">
      <Navbar.Brand href="#">
        <i className="fas fa-paw patita2">
          <span className="text-white">footer</span>
        </i>{" "}
      </Navbar.Brand>
      <Navbar.Brand />
    </Container>
  );
}
