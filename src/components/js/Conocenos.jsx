import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Card_Flipp from "./Card_Flipp";

export default function Conocenos() {
  return (
    <Container>
      <div>
        <h3 className="patita2 text-center mt-5">Quienes somos</h3>
      </div>

      <div>
        <blockquote className="blockquote patita2 text-center">
          Somos un Gimnasio con más de 20 años de experiencia en el
          rubro y profesionales altamente calificados y especialmente
          seleccionados, trabajamos a diario con el objetivo de lograr la
          satisfacción de nuestros socios y brindarle una atención de la más
          alta calidad.
        </blockquote>

        <blockquote className="blockquote patita2 text-center">
          Contamos con profesionales con amplia experiencia que
          ofrecen un trato esmerado al momento de atender cualquier situación
          que se presente.
        </blockquote>

        <blockquote className="blockquote text-center patita2 mt-5">
          <p className="mb-0">
          Las investigaciones acerca de los beneficios de la actividad física y el deporte suelen estar enmarcadas dentro del discurso médico, que propende por la práctica de deporte con miras a disminuir la probabilidad de ocurrencia de patologías de origen cardiaco, respiratorio, metabólico, entre otras. Si bien estos discursos son importantes, por mucho tiempo se ha desconocido, o al menos no se ha reconocido la importancia del deporte en otros contextos de la vida humana. En éste artículo se presenta una serie de investigaciones que hacen evidente los beneficios que el deporte tiene en cuanto a procesos de socialización, procesos mentales, rendimiento escolar y mejoramiento de la calidad de vida de las personas que lo practican.

          </p>
          <footer className="blockquote-footer">
            {" "}
            <cite title="Source Title">Laboratorio Integrado de Ciencias Aplicadas a la Actividad Física y el Deporte - Universidad de Antioquia, Medellín, Colombia.</cite>
          </footer>
        </blockquote>
      </div>

      {<Card_Flipp />}
    </Container>
  );
}
