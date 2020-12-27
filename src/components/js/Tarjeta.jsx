import React, { useState } from "react";
import Cards from "react-credit-cards";
import { Row, Button } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";
import swal from "sweetalert";
import { Redirect, useHistory } from "react-router-dom";

export default function Tarjeta({ setSuma, setCarrito, setArticulos,carrito }) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const history = useHistory();
  const HandleSubmit = (e) => {
    e.preventDefault();

    if (number && name && expiry && cvc && focus) {
      swal({
        title: "Genial!",
        text: "Tu Compra fue confirmada!",
        icon: "success",
        button: "Aceptar",
      });
      setSuma(0);
      setCarrito({
        detalle: [],
        userid: "",
        domicilioEnvio: "",
        totalSale: "",
        pago: "",
        fechaCompra: "",
      });
      setArticulos([]);
      history.push("/Home/Tienda/");
    } else {
      swal("Incompleto", "Completa todos los datos", "error");
    }
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    setFocus("");
  };
  const mercado= async()=>{
    
    const solicitud = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/mercadodepago/?entero="+carrito.totalSale,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
                 }
      }
    );
    console.log(solicitud);

    const respuesta = await solicitud.json();
    console.log("respuesta",respuesta)
    const direccion=respuesta.dire;

    if (solicitud.ok) {
      window.location=direccion;
    }
  }

  return (
    <div className="mt-5">
      <Row>
      {/*  <Cards
          className="col-12 col-md-6 mt-5 mb-5"
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focus}
        />
      </Row>
      <Row className="mt-4">
        <form className="col-12 col-md-6 m-auto" onSubmit={HandleSubmit}>
          <input
            className="form-control mb-2 "
            type="tel"
            name="number"
            maxlength="16"
            placeholder="Numero de la tarjeta"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
          />
          <input
            className="form-control  mb-2 "
            type="text"
            name="name"
            placeholder="Titular de la tarjeta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
          />
          <input
            className="form-control  mb-2 "
            type="text"
            name="expiry"
            maxlength="4"
            placeholder="Fecha Vencimiento"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
          />

          <input
            className="form-control  mb-2 "
            type="tel"
            name="cvc"
            maxlength="3"
            placeholder="Codigo de Seguridad"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
      />*/}
        
          <Button className="float-right mb-5 orange1" onClick={()=>mercado()}>
            Confirmar pago
          </Button>
      
      </Row>
    </div>
  );
}
