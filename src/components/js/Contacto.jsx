import React, { Fragment, useState } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
export default function Contacto() {
  const [contacto, setContacto] = useState({
    subject: "",
    mail: "",
    msg: "",
    mailuser: "",
  });
  const handleChange = (event) => {
    setContacto({
      ...contacto,
      [event.target.name]: event.target.value,
      mail: "adrianbaderlazarte@gmail.com",
    }); // mail del veterinario
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contacto.subject === "") {
      alert("Ingrese Tema");
      return;
    }
    if (contacto.mail === "") {
      alert("Ingrese mail");
      return;
    }
    if (contacto.msg === "") {
      alert("Ingrese msg");
      return;
    }

    ///api/enviarEmail
    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/enviarEmail/",
      {
        method: "POST",
        body: JSON.stringify(contacto),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const respuesta = await solicitud.json();
    if (solicitud.ok) {
      alert("Mail entregado");
      setContacto({ subject: "", mail: "", msg: "", mailuser: "" });
    } else {
    }
    setContacto({ subject: "", mail: "", msg: "", mailuser: "" });
  };
  return (
    <Fragment>
      <Container>
        <Row>
          <div className="col-12 col-md-6 d-flex flex-column mt-5">
            <h3 className="fuente text-center">Formulario de Contacto</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNombre">
                <Form.Label>Motivo del Contacto</Form.Label>
                <Form.Control
                  placeholder=""
                  name="subject"
                  value={contacto.subject}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="mail"
                  defaultValue="adrianbaderlazarte@gmail.com"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email del usuario</Form.Label>
                <Form.Control
                  type="email"
                  name="mailuser"
                  value={contacto.mailuser}
                  placeholder=""
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Label className="fuente">
                Déjanos tu mensaje, ¡A la brevedad nos pondremos en contacto!:{" "}
              </Form.Label>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows="3"
                  maxLength="100"
                  name="msg"
                  defaultValue={contacto.msg}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button className="float-right mb-5 orange" type="submit">
                Enviar
              </Button>
            </Form>
          </div>

          <div className="col-12 col-md-6 mt-5">
            <h2 className="font text-center mt-5">
              <i className="fa fa-home"></i> Dirección
            </h2>
            <ul className="list-unstyled text-center">
              <li> San Martin 2338 </li>
              <li> San Miguel de Tucumán, Tucumán, Argentina</li>
            </ul>

            <h2 className="font text-center">
              <i className="fa fa-phone-square"></i> Telefonos
            </h2>
            <ul className="list-unstyled text-center">
              <li> (0381) 4236778 </li>
              <li> (0381) 155 889431 </li>
            </ul>

            <h2 className="font text-center">
              <i className="fa fa-envelope" aria-hidden="true"></i> Email
            </h2>
            <ul className="list-unstyled text-center">
              <li>adrianbaderlazarte@hotmail.com </li>
            </ul>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
}
