import React, { useState, Fragment } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalTurnos from "./ModalTurnos";
import Emergencia from "../img/Emergencia.jpg";
import Castracion from "../img/Castracion.jpg";
import Controles from "../img/Control.jpg";
import ClinicaVet from "../img/ClinicaVet.jpg";
import Peluqueria from "../img/Peluqueria.jpg";
import Guarderia from "../img/Guarderia.jpg";
import { animateScroll as scroll } from "react-scroll";
export default function Turnos({
  setBanderaTurnos,
  turno,
  setTurno,
  turnos,
  setTurnos,
}) {
  const [modalblock, setModalblock] = useState(false);
  const handleOnclick = () => {
    setModalblock(true);
  };
  return (
    <Fragment>
      <Container className="d-flex inline-block mt-5">
        <Row className="justify-content-center">
          <Card className="my-3 mx-1 shadow" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={Emergencia}
              className="border border-light"
              style={{ height: "11rem" }}
            />
            <Card.Body>
              <Card.Title className="text-cenetr">Emergencias</Card.Title>
              <Card.Text>
                Contamos con una farmacia a nuestra disposicion 24 hs por cualquier emergencia que podria presentarse en el transcurso de nuestro plan Alimenticio.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-3 mx-1 shadow" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={Castracion}
              className="border border-light"
              style={{ height: "11rem" }}
            />
            <Card.Body>
              <Card.Title>Dietas</Card.Title>
              <Card.Text>
                Ofrecemos un servicio de acesoramiento profesional constante.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-3 mx-1 shadow" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={Controles}
              className="border border-light"
              style={{ height: "11rem" }}
            />
            <Card.Body>
              <Card.Title>Controles</Card.Title>
              <Card.Text>
                Ofrecemos continuos controles para llevar tus metas al ultimo nivel.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-3 mx-1 shadow" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={ClinicaVet}
              className="border border-light"
              style={{ height: "11rem" }}
            />
            <Card.Body>
              <Card.Title>Suplementacion</Card.Title>
              <Card.Text>
                Una amplia gama de suplementos nutricionales proporcionados por farmacia asociada 
                para ayudarte a lograr tus metas sin perder tu salud.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-3 mx-1 shadow" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={Peluqueria}
              className="border border-light"
              style={{ height: "11rem" }}
            />
            <Card.Body>
              <Card.Title>Seguimiento Controlado</Card.Title>
              <Card.Text>
                Te realizamos un seguimiento controlado atravez de turnos solicitados n nuestra paguna web.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-3 mx-1 shadow" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={Guarderia}
              className="border border-light"
              style={{ height: "11rem" }}
            />
            <Card.Body>
              <Card.Title>Sistema de turnos</Card.Title>
              <Card.Text>
                Te ofrecemos un sistema de turnos por el cual podras solicitar tu turno para control, seguimiento, dietas etc
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>

      <Row>
        <Button
          className="mt-5 mb-5 nav-info1 mx-auto"
          size="lg"
          onClick={handleOnclick}
        >
          Reserva de turno Online
        </Button>
      </Row>
      {modalblock ? (
        <ModalTurnos
          setBanderaTurnos={setBanderaTurnos}
          modalblock={modalblock}
          setModalblock={setModalblock}
          turno={turno}
          setTurno={setTurno}
          turnos={turnos}
          setTurnos={setTurnos}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
}
