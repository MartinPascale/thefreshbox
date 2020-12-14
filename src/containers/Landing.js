import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";

import { setIsScrolled } from "../reducers/actions";

import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";
import envio from "../assets/envio.png";

import "../styles/landing.scss";

const Landing = (props) => {
  const dispatch = useDispatch();
  const productsAdded = useSelector((state) => state.toJS().cart.products);

  const number = "59809590805";
  const message =
    "Hola TheFreshBox me gustaria saber más sobre sus productos y envíos";
  const url = "https://wa.me/" + number + "?text=" + message;

  const pageEnd = window.innerHeight;
  const catalogo = window.innerHeight + 540;

  const isScrolled = useSelector((state) => state.toJS().isScrolled);

  const scrollTo = (destination) => {
    window.scrollTo(0, destination);
  };

  const openInNewTab = () => {
    var win = window.open(url, "_blank");
    win.focus();
  };

  window.onscroll = () => {
    dispatch(setIsScrolled(window.pageYOffset > window.innerHeight));
  };

  return (
    <div className="landing">
      <Header contactRef={props.carRef} />
      <div className="hero">
        <div className="title">the fresh box</div>
        <div className="sub-title">
          Comprá fruta y verdura sin salir de tu casa y recibila en menos de
          24hs!
        </div>
        <div className="call-to-action">
          <button onClick={() => scrollTo(pageEnd)} className="btn">
            elige tu box
          </button>
          <div className="o">ó</div>
          <button
            onClick={() => scrollTo(catalogo)}
            className="btn btn--second"
          >
            arma el tuyo!
          </button>
        </div>
      </div>
      {!isScrolled && !productsAdded.length > 0 && (
        <div className="social-media">
          <div onClick={() => openInNewTab()}>
            <img className="item" src={whatsapp} />
          </div>
          <img className="item" src={instagram} />
        </div>
      )}
      <div className="envio">
        <img src={envio} />
      </div>
    </div>
  );
};

export default Landing;
