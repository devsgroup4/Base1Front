import React from "react";
import { Button } from "react-bootstrap";

function Producto_Item({
  setBanderaProductos,
  producto,
  setProducto,
  productos,
  setProductos,
  modificacion,
  setModificacion,
  prod,
  setProd
}) {
  const borrar_Producto = async (id) => {
    if (window.confirm("¿Está seguro de querer eliminar el archivo?")) {
      const solicitud = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/producto/" + producto._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const respuesta = await solicitud.json();
      
      if (solicitud.ok) {
        setProd([...prod.filter((t) => t._id !== id)]);
        setBanderaProductos(true);
      } else {
      }
    }
  };

  const modificar_Producto = async (id) => {
    console.log("prod",prod)
    setProducto({ ...prod.find((produ) => produ._id === id) });
    setModificacion(true);
    setBanderaProductos(true);
  };
  return (
    <>
      <tr>
        <td>#</td>
        <td>{producto.nombreProducto}</td>
        <td>{producto.categoria}</td>
        <td>{parseFloat(producto.precio).toFixed(2)}</td>
        <td>{producto.stock}</td>
        <td>
          <Button
            className="mr-1"
            variant="success"
            onClick={() => modificar_Producto(producto._id)}
          >
            <i className="fas fa-pencil-alt"></i>
          </Button>
          <Button
            variant="danger"
            onClick={() => borrar_Producto(producto._id)}
          >
            <i className="fas fa-trash-alt"></i>
          </Button>
        </td>
      </tr>
    </>
  );
}

export default Producto_Item;
