import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Form, Badge, Spinner } from "react-bootstrap";
import Sesion from "./Sesion";
import swal from "sweetalert";
export default function Card_ViewUser({
  ModalShow,
  setModalShow,
  suma,
  setSuma,
  articulos,
  setArticulos,
  producto,
  setProducto,
  carrito,
  setCarrito,
  productos,
  setProductos,
  usuarioAuth,
  setToken,
  setUsuarioAuth,
  setAutenticado,
}) {
  const [cantidadAux, setCantidadAux] = useState(0);
  const [detalles, setDetalles] = useState([]);
  const history = useHistory();

  let aux = new Object();

  const onChangeCantidad = (e) => {
    setCantidadAux(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuarioAuth) {
      swal(
        "Debera loguearse para poder comprar.Si aun no se  registro registrese ."
      );
      setModalShow(true);

      return;
    }
    let artRepetido = [];
    if (cantidadAux > 0 && cantidadAux <= parseInt(producto.stock)) {
      let totalparcial = producto.precio * cantidadAux;

      aux = {
        _id: producto._id,
        nombre: producto.nombreProducto,
        cantidad: parseInt(cantidadAux),
        precio: parseFloat(producto.precio).toFixed(2),
        total: parseFloat(totalparcial).toFixed(2),
      };

      if (articulos.length) {
        artRepetido = articulos.filter(
          (articulo) => articulo._id === producto._id
        );
        let index = articulos.findIndex(
          (articulo) => articulo._id === producto._id
        );
      }
      if (artRepetido.length) {
        let resp = window.confirm(
          "Usted ya a comprado " +
            artRepetido[0].cantidad +
            " cantidades de este articulo si quiere agregar mas eliminelo de su carrito y agregue la cantidad necesaria"
        );
        setCantidadAux(0);
        return;
      }

      setArticulos([...articulos, aux]);
      console.log("cambia articulos en cardviwuser",articulos)
      swal("¡ Buen trabajo! ", "¡ Articulo agregado a tu carrito! ", "success");

      setCantidadAux(0);
      var dia = new Date();
      var diaIso = dia.toISOString();
      setCarrito({
        ...carrito,
        userid: usuarioAuth._id,
        totalSale: suma,
        fechaCompra: diaIso,
      });

      setCantidadAux(0);
    } else {
      alert("Su compra debe ser mayor a cero y menor al stock");
      setCantidadAux(0);
    }
  };

  return (
    <Fragment>
      <Card
        border=""
        className="mt-2  text-center m-2 b-0 rounded card1  w-sm-2 w-md-18 "
      >
        <h6 className="text-center text-uppercase mt-3">
          {producto.nombreProducto}
        </h6>

        <Card.Img
          variant="top"
          className="fotoCarrito"
          src={producto.imgBase64}
        />
        <div className="div-imagen mb-4 ">
          <div>
            <small>Descripcion: {producto.descripcion}</small>
          </div>
        </div>
        <Card.Body>
          {producto.stock == 1 ? (
            <Badge
              pill
              variant="warning"
              className="text-center align-self-end mt-2 mr-1"
            >
              <h5>Ultimo</h5>
            </Badge>
          ) : (
            ""
          )}
          {producto.stock == 0 ? (
            <Badge
              pill
              variant="danger"
              className="text-center align-self-end mt-2"
            >
              <h5>Sin Stock</h5>
            </Badge>
          ) : (
            <Badge
              pill
              variant="dark"
              className="text-center align-self-end mt-2"
            >
              <h5>${parseFloat(producto.precio).toFixed(2)} </h5>
            </Badge>
          )}
          <h5 className="text-white">
            $ {parseFloat(producto.precio).toFixed(2)}
          </h5>

          <p className="text-warning">Stock:{producto.stock} un.</p>
          <Form onSubmit={handleSubmit} className="d-flex nowrap ">
           
            <input
              maxlength="2"
              className="mr-2  rounded-1"
              type="number"
              min="0"
              size="sm"
              max="99"
              onChange={onChangeCantidad}
              name="cantidadAux"
              value={cantidadAux}
            />

            <Button
              className=" b-0 nav-info1 m-auto mr-2"
              type="submit"
              size="sm"
            >
              Agregar al<i className="fas fa-cart-plus mx-1 mt-1"></i>
            </Button>
          </Form>
          <Sesion
            show={ModalShow}
            onHide={() => setModalShow(false)}
            setToken={setToken}
            setUsuarioAuth={setUsuarioAuth}
            setAutenticado={setAutenticado}
          />
        </Card.Body>
      </Card>
    </Fragment>
  );
}
