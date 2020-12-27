import React from "react";
import { Container, Row, Image ,Col} from "react-bootstrap";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import servicios1 from "../img/servicios1.jpg";
import servicios2 from "../img/servicios2.jpg";
import servicios3 from "../img/servicios3.jpg";
import servicios4 from "../img/servicios4.jpg";
import servicios5 from "../img/servicios5.jpg";
import servicios6 from "../img/servicios6.jpg";
import servicios7 from "../img/servicios7.jpg";
import servicios8 from "../img/servicios8.jpg";
import servicios9 from "../img/servicios9.jpg";
import servicios10 from "../img/servicios10.jpg";
import servicios11 from "../img/servicios11.jpg";
import servicios12 from "../img/servicios12.jpg";
import servicios13 from "../img/servicios13.jpg";
import servicios14 from "../img/servicios14.jpg";
import servicios15 from "../img/servicios15.jpg";
import servicios16 from "../img/servicios16.jpg";
import servicios17 from "../img/servicios17.jpg";
import servicios18 from "../img/servicios18.jpg";
import video from ".././img/Euk_Homepage_Video.mp4";
import { animateScroll as scroll } from "react-scroll";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Servicios() {

  
  return (
    <Container>
      <div>
        <h3 className="fuente text-center mt-5"> Nuestros Servicios </h3>
      </div>
      <div>
        <Carousel breakPoints={breakPoints}>
          <img src={servicios1} className="imgserv p-2" alt="" />
          <img src={servicios7} className="imgserv p-2" alt="" />
          <img src={servicios2} className="imgserv p-2" alt="" />
          <img src={servicios8} className="imgserv p-2" alt="" />
          <img src={servicios11} className="imgserv p-2" alt="" />
          <img src={servicios3} className="imgserv p-2" alt="" />
          <img src={servicios6} className="imgserv p-2" alt="" />
          <img src={servicios18} className="imgserv p-2" alt="" />
          <img src={servicios9} className="imgserv p-2" alt="" />
          <img src={servicios4} className="imgserv p-2" alt="" />
          <img src={servicios5} className="imgserv p-2" alt="" />
          <img src={servicios10} className="imgserv p-2" alt="" />
          <img src={servicios12} className="imgserv p-2" alt="" />
          <img src={servicios16} className="imgserv p-2" alt="" />
        </Carousel>
      </div>

      <div className="text-center ">
        <p className="letra1">
          Te esperamos para que disfrutes de todos nuestros servicios en un solo Lugar MEGA ZEUS GYM . "Un lugar para toda la familia". Te ofrecemos:
        </p>
        <ul className="list-unstyled patita2 letra">
          <li>Clases Grupales</li>
          <li>Acesoramiento Personalizado</li>
          <li>Seguimiento</li>
          <li>Clases para niños y niñas de todas las edades.</li>
          <li>Suplementacion deportiva.</li>
        </ul>
      </div>

      <div>
     

        <Row className="letra1 ">
          <Col className="mr-2 col">
          <p>
            Tenemos un gran equipo de
            y el mejor acesoramiento a cargo de profesionales. 
          </p>
          <ul>
            <li>Clases de MMA</li>
            <li>Gimnasia Artistica</li>
            <li>Zumba</li>
            <li>Spinning</li>
            <li>Croos-fit</li>
            <li>Sala de Aparatos Multiples y Cardio</li>
          </ul>
          </Col>
          <Col>
        
          <Image
            src={servicios7}
            className="  mt-4 mr-3 borde"
            width="400"
            height="236"
          />
         </Col>
         </Row>
         <Row>
          <div className="mr-3 p-3">
            <p>
              Gracias a nuestra disponibilidad de espacio podras realizar
               tranquila tu actividad Fisica.
            </p>
            <p>
              En nuestras instalaciones tenemos espacios diferenciados para cada
              necesidad,nuestro objetivo es que se sienta en casa
            </p>
            <p>
              Contamos con un espacio separados  y 3 plantas con actividades diferenciadas.
            </p>
          </div>
        </Row>
      </div>

      <div className="mb-5 letra1">
        <img
          src={servicios8}
          className="float-right img-thumbnail borde"
          width="304"
          height="236"
        ></img>

        <p>
          Disponemos de un salon
          completamente equipado para realizar todo tipo de actividad de musculacion y Cardio bien espaciado.
        </p>
        <p>
          Contamos con equipo acesor constante.
        </p>
        <p>
          Tenemos un sistema de turnos para consultas especificas y/ o Seguimiento preferencial.
        </p>
      </div>
    </Container>
  );
}
