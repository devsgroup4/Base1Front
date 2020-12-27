import React from "react";
import { Table, Button, Container } from "react-bootstrap";

export default function Carrito_Total({
  setEventKey,
  suma,
  setSuma,
  articulos,
  setArticulos,
  compras,
  setCompras,
  carrito,
  setCarrito,
}) {
  const Delete = (id) => {
    if (
      window.confirm(
        "Esta seguro de querer eliminar este producto del carrito?"
      )
    ) {
      let posicion = articulos.findIndex((articulo) => articulo._id !== id);
      let resultado = articulos.filter((articulo) => articulo._id !== id);
      setSuma(0);
      setArticulos(resultado);

      window.alert("Producto Eliminado");
    }
  };
  const venta = () => {
    setCarrito({ ...carrito, detalle: articulos, totalSale: suma });

    setEventKey("domicilio");
  };

  return (
    <Container>
      <Table className="mx-auto mt-3 ">
        <thead>
          <tr className="">
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Precio Total</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <div id="alerta"></div>
          {articulos.map((articulo) => (
            <tr>
              <td key={articulo._id}>{articulo.nombre}</td>
              <td>{articulo.cantidad}</td>
              <td>{parseFloat(articulo.precio).toFixed(2)}</td>
              <td>{articulo.total}</td>
              <td>
                <Button
                  className="mr-1"
                  variant="success"
                  onClick={() => Delete(articulo._id)}
                >
                  <i class="far fa-trash-alt"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="float-right mb-5 mt-3">
        <p className="d-inline">Total = $ {suma}</p>
        {suma > 0 ? (
          <Button className="ml-3 d-inline orange1" onClick={() => venta()}>
            Pagar
          </Button>
        ) : (
          <Button
            disabled
            className="ml-3 d-inline orange1"
            onClick={() => venta()}
          >
            Pagar
          </Button>
        )}
      </div>
    </Container>
  );
}
