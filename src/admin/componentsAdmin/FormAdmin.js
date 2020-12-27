import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Card, Button, Form, Row } from "react-bootstrap";
const categorias = [
  { op: "Nutrilab", ph: " Ej: Marca:dogui Razas:Pequenas Cantidad:5kg" },
  { op: "ENA", ph: "Ej: Shampoo para pulgas 250 ml." },
  { op: "Nutremax", ph: "Ej: Collar perro raza pequena" },
  { op: "Varios", ph: "Ej: Buzo super man razas pequenas" },
];
export default function FormAdmin({
  prod,
  setProd,
  producto,
  setProducto,
  productos,
  setProductos,
  modificacion,
  setModificacion,
  token,
  setBanderaProductos,
}) {
  const [phvar, setPhvar] = useState({ op: "", ph: "" });

  const handleChange = (event) => {
    if (event.target.name == "precio") {
      setProducto({
        ...producto,
        [event.target.name]: parseFloat(event.target.value).toFixed(2),
      });
    } else {
      setProducto({ ...producto, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (producto.categoria === "") {
      alert("Ingrese categoria");
      return;
    }
    if (producto.nombreProducto === "") {
      alert("Ingrese nombre");
      return;
    }

    if (producto.descripcion === "") {
      alert("Ingrese cantidad");
      return;
    }

    if (producto.precio === "") {
      alert("Ingrese precio");
      return;
    }
    if (producto.stock === "") {
      alert("Ingrese stock disponible");
      return;
    }

    if (!modificacion) {
      const solicitud = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/producto/",
        {
          method: "POST",
          body: JSON.stringify(producto),
          headers: {
            "Content-Type": "application/json",
            "x-token": token,
          },
        }
      );
      const respuesta = await solicitud.json();
      if (solicitud.ok) {
        console.log("set=",setBanderaProductos);
        alert("Producto Cargando Correctamente en tu Tienda");
        setBanderaProductos(true);
      } else {
      }
    } else {
      setProducto(prod.find((produ) => produ._id === producto._id));
      const solicitud = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/producto/" + producto._id,
        {
          method: "PUT",
          body: JSON.stringify(producto),
          headers: {
            "Content-Type": "application/json",
            // 'x-auth-token': token
          },
        }
      );

      const respuesta = await solicitud.json();

      if (solicitud.ok) {
        setProductos([
          ...prod.filter((t) => t._id !== producto._id),
          respuesta,
        ]);
        setBanderaProductos(true);
        setModificacion(false);
      } else {
      }
    }

    setProducto({
      imgBase64: "",
      categoria: "",
      nombreProducto: "",
      descripcion: "",
      precio: "",
      stock: 0,
      imgBase64: null,
    });
  };
  const handleChangeSelect = (e) => {
    setProducto({ ...producto, categoria: e.target.value });
    setPhvar(categorias.find((item) => item.op === e.target.value));
  };

  const onChangeImagen = (e) => {
    if (e.target.files.length) {
      if (e.target.files[0].size > 4194304) {
        // 5242880 = 5MB
        // 4194304 = 4MB
        e.target.value = null;
        alert("La imagen es demasiado grande");
        setProducto({
          ...producto,
          imgBase64: null,
        });
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setProducto({
          ...producto,
          imgBase64: reader.result,
        });
      };
    } else {
      setProducto({
        ...producto,
        imgBase64: null,
      });
    }
  };

  return (
    <>
      <Container className="my-2 mx-2">
        <Card>
          <div className="text-center">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <Card.Body>
            <Card.Title className="text-center">
              Gestion de Productos
            </Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.File
                  id="imagen"
                  size="sm"
                  label="Agregar foto"
                  onChange={onChangeImagen}
                  name="imgBase64"
                  id="img"
                />
              </Form.Group>

              <Form.Label>Categorias del producto</Form.Label>

              <Form.Control
                size="sm"
                className="mt-1 mb-1"
                as="select"
                name="categoria"
                onChange={handleChangeSelect}
                // value={producto.categoria}
              >
                <option value={-1}>Categorias:</option>
                {categorias.map((item, i) => (
                  <option key={i} value={item.op}>
                    {item.op}
                  </option>
                ))}
              </Form.Control>

              <Form.Group>
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="txt"
                  size="sm"
                  placeholder="Nombre Producto"
                  value={producto.nombreProducto.toLocaleUpperCase()}
                  onChange={handleChange}
                  name="nombreProducto"
                  id="nombre"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripcion del producto</Form.Label>
                <Form.Control
                  as="textarea"
                  row={3}
                  size="sm"
                  placeholder={phvar.ph}
                  value={producto.descripcion}
                  onChange={handleChange}
                  name="descripcion"
                  id="descripcion"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  size="sm"
                  name="precio"
                  id="precio"
                  value={producto.precio}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Stock : </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  size="sm"
                  max="99"
                  placeholder="Stock"
                  onChange={handleChange}
                  value={producto.stock}
                  name="stock"
                  id="stock"
                />
              </Form.Group>

              <Button className="orange" type="submit" variant="primary">
                {modificacion ? "Modificar" : "Agregar a Tienda"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
