import React, { useState } from "react";
import { Form, Button, Modal, Nav, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Registro from "./Registro";
import swal from "sweetalert";

function Sesion(props) {
  const { setToken, setUsuarioAuth, setAutenticado, setModalShow } = props;

  const [showRegi, setShowRegi] = useState(false);
  const [registro, setRegistro] = useState({
    mail: "",
    password: "",
  });

  const history = useHistory();

  const handleLogin = () => {};
  const handleChange = (event) => {
    setRegistro({ ...registro, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (registro.mail === "") {
      swal("Ingrese  mail");
      return;
    }

    if (registro.password === "") {
      swal("Ingrese password");
      return;
    }

    const PostUser = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/auth/",
      {
        method: "POST",
        body: JSON.stringify(registro),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const respuesta = await PostUser.json();

    if (PostUser.ok) {
      swal("Usuario Verificado");

      setToken(respuesta.token);
      setUsuarioAuth(respuesta.user);
      setAutenticado(true);

      setRegistro({
        mail: "",
        password: "",
      });

      if (respuesta.user.isUser == false) {
        history.push("/Admin");
      } else {
        setModalShow(false);
        history.push("/");
      }
    } else {
      swal(
        respuesta.msg +
          " o usted no es un usuario registrado en ese caso registrese por favor."
      );
      setRegistro({
        mail: "",
        password: "",
      });
      return;
    }
  };

  const Registrarse = () => {
    setShowRegi(true);
  };

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="container-modal-inicio-sesion-centro"
        backdrop="static"
        keyboard="false"
        centered
      >
        <Modal.Header className="nav-info" closeButton>
          <Modal.Title className="text-center patita1">
            Inicio de Sesión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col}>
              <Form.Label></Form.Label>
              <Form.Label>Mail:</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingrese su nombre de usuario"
                name="mail"
                value={registro.mail}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Ingrese su contraseña"
                onChange={handleChange}
                name="password"
                value={registro.password}
              />
            </Form.Group>
            <Button className="orange" onClick={handleSubmit}>
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="nav-info">
          {/* Inicio de sesión */}

          <Button className="orange" onClick={Registrarse}>
            Registrarse
          </Button>

          <Registro
            setModalShow={setModalShow}
            setToken={setToken}
            setUsuarioAuth={setUsuarioAuth}
            setAutenticado={setAutenticado}
            showRegi={showRegi}
            setShowRegi={setShowRegi}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Sesion;
