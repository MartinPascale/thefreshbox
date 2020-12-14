import React from "react";

import ContactForm from "./ContactForm";

import logo from "../assets/logo2.png";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";

import "../styles/Contacto.scss";

const Contacto = (props) => {
  const title = "Contacto";
  return (
    <>
      <div ref={props.carRef} id="contacto" className="catalogo-title">
        <span>{title}</span>
      </div>
      <div className="contacto">
        <div>
          <img src={logo} height={165} width={235} />
        </div>
        <div className="contacto__text">
          Encontranos en nuestras redes sociales
        </div>
        <div className="social-media">
          <img className="item" src={whatsapp} />
          <img className="item" src={instagram} />
        </div>
        <div className="contacto__text">
          O envianos un email solicitando presupuesto:
        </div>
        <ContactForm />
      </div>
    </>
  );
};

export default Contacto;
