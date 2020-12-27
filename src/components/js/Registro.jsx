import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
function Registro(props) {
  const {
    setModalShow,
    setToken,
    setUsuarioAuth,
    setAutenticado,
    setPedidoUser,
    showRegi,
    setShowRegi,
  } = props;
  const cerrarRegi = () => setShowRegi(false);
  const verRegi = () => setShowRegi(true);

  const [registros, setRegistros] = useState([]);

  const [registro, setRegistro] = useState({
    nombre: "",
    apellido: "",
    domicilio: "",
    provincia: "",
    localidad: "",
    cpostal: "",
    mail: "",
    user: "",
    password: "",
  });
  const RegistroAdmin = {
    nombre: "",
    apellido: "",
    domicilio: "",
    provincia: "",
    localidad: "",
    cpostal: "",
    mail: "",
    user: "",
    password: "",
    isUser: "",
  };
  const history = useHistory();
  //alta administrador una sola vez
  const AltaAdmin = async () => {
    const RegistroAdmin = {
      nombre: "Adrian",
      apellido: "Lazarte",
      domicilio: "San Martin 2338",
      provincia: "Tucuman",
      localidad: "San Miguel",
      cpostal: "4000",
      mail: "adrianbaderlazarte@gmail.com",
      user: "adrian",
      password:"admin",
      isUser: "false",
    };

    const PostUser = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/user/",
  
      {
        method: "POST",
        body: JSON.stringify(RegistroAdmin),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const respuesta = await PostUser.json();

    if (PostUser.ok) {
    }
  };
  useEffect(() => {
    AltaAdmin();
  }, []);

  const handleChange = (event) => {
    setRegistro({ ...registro, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistro({ ...registro, isUser: true });
    if (registro.nombre === "") {
      swal("Ingrese nombre");
      return;
    }
    if (registro.apellido === "") {
      swal("Ingrese apellido");
      return;
    }
    if (registro.domicilio === "") {
      swal("Ingrese domicilio");
      return;
    }
    if (registro.provincia === "") {
      swal("Ingrese provincia");
      return;
    }
    if (registro.localidad === "") {
      swal("Ingrese localidad");
      return;
    }
    if (registro.cpostalostal === "") {
      swal("Ingrese codigo postal");
      return;
    }
    if (registro.mail === "") {
      swal("Ingrese mail valido");
      return;
    }
    if (registro.user === "") {
      swal("Ingrese usuario");
      return;
    }
    if (registro.password === "") {
      swal("Ingrese contraseña");
      return;
    }
    if (registro.password === "") {
      swal("Ingrese nuevamente la contraseña ");
      return;
    }
    if (window.confirm("Esta seguro de su registro")) {
      const PostUser = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/user/",
        
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
        alert("Usuario Registrado correctamente.");
        setToken(respuesta.token);
        setUsuarioAuth(respuesta.user);
        setAutenticado(true);
        setModalShow(false);
        setRegistro({
          nombre: "",
          apellido: "",
          domicilio: "",
          provincia: "",
          localidad: "",
          cpostal: "",
          mail: "",
          user: "",
          password: "",
        });
        setModalShow(false);

        setShowRegi(false);
        history.push("/Home");
      } else {
        swal(respuesta.msg);
        setShowRegi(false);
      }
    }
    setShowRegi(false);
  };
  const onHandleonBlur = (event) => {
    if (registro.password !== event.target.value) {
      alert("Las contrasenas no coinciden reingrese contraseña");
      setRegistro({
        ...registro,
        password: "",
      });
      setShowRegi(false);
    }
  };
  return (
    <>
      <Modal show={showRegi} onHide={cerrarRegi}>
        <Modal.Header className="nav-info" closeButton>
          <h3 className="text-center patita1">Registro</h3>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  value={registro.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  value={registro.apellido}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Domicilio:</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingrese su domicilio"
                name="domicilio"
                value={registro.domicilio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Provincia:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su provincia"
                  name="provincia"
                  value={registro.provincia}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Localidad:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su localidad"
                  name="localidad"
                  value={registro.localidad}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Código postal:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su código postal"
                  name="cpostal"
                  value={registro.cpostal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Mail:</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Ingrese su dirección de correo electrónico"
                name="mail"
                value={registro.mail}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                {" "}
                Nunca vamos a compartir tu e-mail con nadie.
              </Form.Text>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  name="user"
                  value={registro.user}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>password:</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}
                  name="password"
                  value={registro.password}
                />
              </Form.Group>
            </Form.Row>
            <Button className="orange" type="submit">
              Registrarme
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="nav-info"></Modal.Footer>
      </Modal>
    </>
  );
}
export default Registro;
