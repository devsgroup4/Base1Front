import React, { Fragment } from "react";
import { Container ,Button} from "react-bootstrap";
import { animateScroll as scroll } from "react-scroll";
import { useLocation ,useHistory} from "react-router-dom";
import celular from "./img/celular.jpg"
import Portada from "./img/Portada.png"
function MainVideo({ video }) {
  let scrollTo = () => {
    scrollTo(500);
  };

  const { pathname } = useLocation();
  const history = useHistory();
  const showVideo =
    pathname !== "/Home/Tienda" &&
    pathname !== "/Home/Turnos" &&
    pathname !== "/Home/Cart";
  const className = `p-0 bg-light ${showVideo ? "" : "d-none"}`;
  return (
    <>
      <Container fluid className={className} >
        <div className="d-md-none">
      <img src={celular} width="100%" height="100%"></img>
      </div>
          <div className="d-none d-md-block">
          <img src={Portada} width="100%" height="100%"></img>
          <h2 className="letravideo text-center text-light">
              Suplementos Deportivos 
            </h2>
            <Button className="buttonvideo" onClick={()=>history.push("/Home/Tienda")}>Encontralos Aqui</Button>
          </div>
        
      </Container>
      {!showVideo && <div style={{ height: "90px" }}></div>}
    </>
  );
}

export default MainVideo;
