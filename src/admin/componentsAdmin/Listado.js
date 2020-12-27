import React from "react";
import { Table, Col, Row } from "react-bootstrap";
import Producto_Item from "./Producto_Item";
import Paginacion from "../../components/Paginacion";
function Listado({
  traerProductos,
  prod,
  setProd,
  token,
  producto,
  setProducto,
  productos,
  setProductos,
  modificacion,
  setModificacion,
  setBanderaProductos,
  paginacionProductos,
  setPaginacionProductos,
}) {
  return (
    <>
      <h3 className="mt-3">Listado de Productos</h3>
      <div className="container mb-5">
        <div className="row">
          <Col>
            <div className="">
              <Table
                id="dtHorizontalVerticalExample"
                className="table table-striped table-bordered table-lg"
                cellSpacing="0"
                width="100%"
              >
                <thead className="nav-info font">
                  <tr className="font">
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.Productos
                    ? productos.Productos.map((producto) => (
                        <Producto_Item
                          token={token}
                          producto={producto}
                          setProducto={setProducto}
                          productos={productos}
                          setProductos={setProductos}
                          modificacion={modificacion}
                          setModificacion={setModificacion}
                          setBanderaProductos={setBanderaProductos}
                          prod={prod}
                          setProd={setProd}
                        />
                      ))
                    : ""}
                </tbody>
              </Table>
            </div>
          </Col>
        </div>
      </div>
      <Row>
        <Col className="">
          {paginacionProductos ? (
            <Paginacion
              paginacionData={productos}
              funcionGetData={traerProductos}
              setBanderaProductos={setBanderaProductos}
            />
          ) : null}
        </Col>
      </Row>
    </>
  );
}
export default Listado;
