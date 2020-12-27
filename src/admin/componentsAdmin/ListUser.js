import React, { useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
export default function ListUser({ turnoxDia, turnos, setTurnos, user }) {
  let c = 0;
  let mailTodos = "";
  const [aparecer, setAparecer] = useState(false);
  const [contacto, setContacto] = useState({
    subject: "",
    mail: "",
    msg: "",
    mailuser: "",
  });
  const handleChange = (event) => {
    setContacto({ ...contacto, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contacto.subject === "") {
      alert("Ingrese Tema");
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
      setAparecer(false);
    } else {
    }
    setContacto({ subject: "", mail: "", msg: "", mailuser: "" });
  };
  const handleMail = (e) => {
    setAparecer(true);
    user.map((item) => (mailTodos = item.mail + "," + mailTodos));
    setContacto({ ...contacto, mail: mailTodos });
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Listado de usuarios</h3>

          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <Table
              id="dtHorizontalVerticalExample"
              className="table table-striped table-bordered table-sm "
              cellSpacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Mail</th>
                  <th>Domicilio</th>
                  <th>Provincia</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item) => (
                  <tr key={item._id}>
                    <td> {c++}</td>

                    <td>{item.nombre}</td>
                    <td>{item.apellido}</td>
                    <td>{item.mail}</td>
                    <td>{item.domicilio}</td>
                    <td>{item.provincia}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              className="float-right mb-5 pl-5 pr-5 orange "
              onClick={handleMail}
            >
              <i className="fas fa-mail-bulk  "></i>
            </Button>
          </div>
        </Col>
      </Row>
      {!aparecer ? (
        <Row className="d-none"></Row>
      ) : (
        <Row>
          <Col>
            <div className="">
              <h2 className="patita2 text-center mb-5">
                Envio de Mail Masivos de ofertas.
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                  <Form.Label>Producto de oferta</Form.Label>
                  <Form.Control
                    placeholder=""
                    name="subject"
                    required
                    value={contacto.subject}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email del veterinario</Form.Label>
                  <Form.Control
                    type="email"
                    name="mailuser"
                    required
                    value={contacto.mailuser}
                    placeholder=" veterinario@veterinario.com"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Label>Mensaje masivo a enviar: </Form.Label>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    maxLength="100"
                    name="msg"
                    value={contacto.msg}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className="float-right mb-5 orange" type="submit">
                  Enviar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
