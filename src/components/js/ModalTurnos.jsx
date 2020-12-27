import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row, Card } from "react-bootstrap";
import "../../../src/App.css";
import moment, { ISO_8601 } from "moment";
import swal from "sweetalert";
import imgCard from "../img/cardSup.jpg";
import ButtonTurnos from "../js/BottonTurnos";
const motivos = [
  { op: "Urgencia", ph: " Ej: Tengo una urgencia por malestar" },
  { op: "Dieta", ph: "Ej: Necesito plan de alimentacion y suplementacion" },
  { op: "Control", ph: "Ej: Necesito control mensual" },
  { op: "Seguimiento", ph: "Ej: Necesito seguimiento por dieta" },
  {
    op: "Suplementos",
    ph: "Ej: Necesito Informacion de suplementos",
  }
 
];
const horarios = [
 /* "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",*/
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  





];
export default function ModalTurnos({
  setBanderaTurnos,
  modalblock,
  setModalblock,
  turno,
  setTurno,
  turnos,
  setTurnos,
}) {
  const [opcion, setOpcion] = useState(-1);
  const [disponibles, setDisponibles] = useState([]);

  moment().locale("es");

  const [a, setA] = useState(null);
  const [bandera, setBandera] = useState(false);
  const [bandera2, setBandera2] = useState(false);
  const [none, setNone] = useState(false);
  const [phvar, setPhvar] = useState({ op: "", ph: "" });

  const handleChange = (event) => {
    setTurno({ ...turno, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (turno.motivoTurno === "") {
      swal("Ingrese el motivo de la consulta");
      return;
    }
    if (turno.detalleTurno === "") {
      swal("Ingrese el detalle de la consulta");
      return;
    }

    if (turno.nombreTurno === "") {
      swal("Ingrese su nombre");
      return;
    }
    if (turno.apellidoTurno === "") {
      swal("Ingrese su apellido");
      return;
    }
    if (turno.telefonoTurno === "") {
      swal("Ingrese su teléfono");
      return;
    }

    setTurno({ ...turno, diaHoraTurno: a });

    const Turno1 = {
      motivoTurno: turno.motivoTurno,
      detalleTurno: turno.detalleTurno,
      diaHoraTurno: a,
      nombreTurno: turno.nombreTurno,
      apellidoTurno: turno.apellidoTurno,
      telefonoTurno: turno.telefonoTurno,
    };

    let resp = window.confirm("¿Desea confirmar su reserva?");

    if (resp) {
      const PostTurno = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/turno/",
        {
          method: "POST",
          body: JSON.stringify(Turno1),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const respuesta = await PostTurno.json();

      if (PostTurno.ok) {
        swal("Turno Registrado correctamente.");
        setBanderaTurnos(true);

        setTurno({
          motivoTurno: "",
          detalleTurno: "",
          diaHoraTurno: "",
          nombreTurno: "",
          apellidoTurno: "",
          telefonoTurno: "",
        });
      } else {
        swal(respuesta.msg);
      }
    } else {
      swal("Reserva cancelada");
    }

    ////que  el turno  este vigente'
    setModalblock(false);
    //recien Guardar en el arrglo
  };
  let aux = [];
  let aux1 = [];
  let arrayDisponible = [];
  const sDomingos = (e) => {
    let day = new Date(e.target.value).getDay();

    if (day == 6) {
      alert(
        "Lo sentimos, los domingos el gimnasio se encuentra cerrado. Por favor, ingrese un día distinto."
      );
      setTurno({ ...turno, diaHoraTurno: "" });
    } else {
      aux = turnos.filter(
        (item) =>
          moment(e.target.value).format("DD") == moment(day).format("DD")
      ); //turnos del dia
      turnos.map((item) => {
        if (
          moment(item.diaHoraTurno).format("DD") ==
          moment(e.target.value).format("DD")
        ) {
          aux.push(item);
        }
      });

      for (let index = 0; index < horarios.length; index++) {
        aux1 = aux.filter(
          (item) =>
            moment.utc(item.diaHoraTurno).format("HH:mm") == horarios[index]
        );

        aux.map((item) =>
          console.log(
            "acaaaa" +
              moment.utc(item.diaHoraTurno).format("HH:mm") +
              "=" +
              horarios[index]
          )
        );
        if (aux1.length == 0) {
          arrayDisponible.push(horarios[index]);
          aux1 = [];
        }
      }

      setTurno({
        ...turno,
        diaHoraTurno: moment(e.target.value).format("YYYY-MM-DD"),
      });
      setDisponibles(arrayDisponible);
    }
  };

  const handleChangeSelect = (e) => {
    setOpcion(e.target.value);
    setTurno({ ...turno, motivoTurno: e.target.value });

    setPhvar(motivos.find((item) => item.op === e.target.value));
  };
  const handleHora = (e) => {
    setA(turno.diaHoraTurno + "T" + e.target.value + ":00.000Z");
  };

  const [min, setMin] = useState(moment().format(moment.HTML5_FMT.DATE));
  const [max, setMax] = useState(
    moment().add(7, "days").format(moment.HTML5_FMT.DATE)
  );

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Modal.Dialog>
          <div>
            <Card.Img
              variant="top"
              src={imgCard}
              className="border border-light"
              style={{ height: "11rem" }}
            />

            <Modal.Header closeButton>
              <Modal.Title>
                <p className="line anim-typewriter mt-1 mje">
                  Bienvenid@! Saque su turno online:
                </p>
              </Modal.Title>
            </Modal.Header>
            <div className="">
              <p className="line anim-typewriter mt-3  mje">
                Seleccione un Motivo de Consulta:
              </p>
              <Row>
                <Col></Col>
                <Col>
                  {" "}
                  <Form.Control
                    size="sm"
                    className="mt-1 inputChat mb-1"
                    as="select"
                    name="detalleTurno"
                    onChange={handleChangeSelect}
                    value={turno.motivoTurno}
                  >
                    <option value={-1}>Motivo de Consulta :</option>
                    {motivos.map((item, i) => (
                      <option key={i} value={item.op}>
                        {item.op}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col></Col>
              </Row>

              <div className="d-flex nowrap mt-3">
                <Form.Control
                  className="inputChat"
                  as="textarea"
                  placeholder={phvar.ph}
                  rows={1}
                  size="sm"
                  onChange={handleChange}
                  type="text"
                  value={turno.detalleTurno}
                  name="detalleTurno"
                />

                <Button
                  className="mr-2 mt-1 mb-1 ml-1 orange1"
                  onClick={() => {
                    turno.detalleTurno
                      ? setBandera2(true)
                      : swal("Ingrese valor");
                  }}
                >
                  <i className="fas fa-step-forward "></i>
                </Button>
              </div>
            </div>
          </div>
          {/*seg. salida*/}

          {bandera2 ? (
            <div>
              <p className="line anim-typewriter mt-5  mje">¡Excelente!</p>
              <p className="line anim-typewriter mt-1 mb-3 mje">
                Completa fecha y hora de tu turno!
              </p>

              <div className="d-flex nowrap">
                <Form.Control
                  className="inputChat"
                  min={min}
                  max={max}
                  onBlur={sDomingos}
                  controls={true}
                  type="Date"
                  onChange={handleChange}
                  value={turno.diaHoraTurno}
                  name="diaHoraTurno"
                  id="datafield"
                />
                <Form.Control
                  size="sm"
                  className="mt-1 inputChat mb-1"
                  as="select"
                  name="hora"
                  onChange={handleHora}

                  //value={()=>setHora(number)}
                >
                  <option>Turnos :</option>
                  {disponibles.length
                    ? disponibles.map((number) => (
                        <option value={number}>{number}</option>
                      ))
                    : ""}
                </Form.Control>

                {!turno.diaHoraTurno ? (
                  <Button
                    className="mr-1 ml-1 orange1"
                    onClick={() => {
                      setBandera2(false);
                      setBandera(false);
                    }}
                  >
                    <i className="fas fa-step-forward"></i>
                  </Button>
                ) : (
                  ""
                )}

                {turno.diaHoraTurno ? (
                  <Button
                    className="mr-1 ml-1 orange1"
                    onClick={() => {
                      setBandera2(true);
                      setBandera(true);
                    }}
                  >
                    <i className="fas fa-step-forward"></i>
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          {bandera && bandera2 ? (
            <div className="">
              <p className="line anim-typewriter mt-5 mb-3 mje">
                Está a pasos de obtener su reserva:
              </p>

              <div className="d-flex nowrap">
                <Form.Row>
                  <Col>
                    <Form.Control
                      placeholder="Nombre"
                      className="inputChat"
                      onChange={handleChange}
                      type="text"
                      value={turno.nombreTurno}
                      name="nombreTurno"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Apellido"
                      className="inputChat"
                      onChange={handleChange}
                      type="text"
                      value={turno.apellidoTurno}
                      name="apellidoTurno"
                    />
                  </Col>

                  <Col>
                    <Form.Control
                      placeholder="Teléfono"
                      type="tel"
                      className="inputChat"
                      onChange={handleChange}
                      value={turno.telefonoTurno}
                      name="telefonoTurno"
                    />
                  </Col>
                </Form.Row>

                <Button
                  className="mr-1 ml-1 orange1"
                  onClick={() => {
                    setNone(true);
                  }}
                >
                  <i className="fas fa-step-forward "></i>
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}

          <Modal.Footer>
            {none ? (
              <p className="line anim-typewriter mt-2 text-success "></p>
            ) : (
              ""
            )}
            {none ? (
              <Button className="orange1" type="onSubmit">
                {" "}
                CONFIRMA TU RESERVA
              </Button>
            ) : (
              <Button className="orange1" disabled type="onSubmit">
                Envia tu reserva!
              </Button>
            )}
          </Modal.Footer>
        </Modal.Dialog>
      </Form>
    </div>
  );
}
