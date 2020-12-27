import React, { useState } from "react";
import { Table, Button, Form, Row, Col, Tab, Tabs } from "react-bootstrap";
import moment, { parseZone } from "moment";
export default function Turnos({ turnoxDia, turnos, setTurnos, user }) {
  let c = 0;

  return (
    <div>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Todos los turnos">
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <Table
              id="dtHorizontalVerticalExample"
              className="table table-striped table-bordered table-sm "
              cellSpacing="0"
              width="100%"
            >
              <thead className="nav-info">
                <tr className="font">
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>Dia</th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((item) => (
                  <tr key={item._id}>
                    <td> {c++}</td>

                    <td>{item.nombreTurno}</td>
                    <td>{item.apellidoTurno}</td>
                    <td>{item.telefonoTurno}</td>
                    <td>
                      {moment(parseZone(item.diaHoraTurno)).format(
                        "DD-MM-YYYY hh:mm"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Turnos de Hoy">
          <Table
            id="dtHorizontalVerticalExample"
            className="table table-striped table-bordered table-sm "
            cellSpacing="0"
            width="100%"
          >
            <thead className="nav-info">
              <tr className="font">
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Dia</th>
              </tr>
            </thead>
            <tbody>
              {turnoxDia.map((item) => (
                <tr key={item._id}>
                  <td> {c++}</td>

                  <td>{item.nombreTurno}</td>
                  <td>{item.apellidoTurno}</td>
                  <td>{item.telefonoTurno}</td>
                  <td>
                    {moment(parseZone(item.diaHoraTurno)).format(
                      "DD-MM-YYYY hh:mm"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
}
