import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/logo2.png";

import "../styles/Header.scss";

const Header = ({ fromAbout, contactRef }) => {
  const [contacto, setContacto] = useState();
  const catalogo = window.innerHeight + 600;
  const isScrolled = useSelector((state) => state.toJS().isScrolled);

  const scrollTo = (destination) => {
    if (fromAbout) {
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      window.scrollTo(0, destination);
    }
  };

  useEffect(() => {
    setContacto(contactRef && contactRef.current.offsetTop);
  }, []);

  return (
    <div
      className={
        isScrolled || fromAbout
          ? "navigation"
          : "navigation navigation--no-background"
      }
    >
      <Link to="/">
        <img src={logo} width={40} height={40} />
      </Link>
      <button onClick={() => scrollTo(contacto)} className="item">
        contacto
      </button>
      {!fromAbout && (
        <button onClick={() => scrollTo(catalogo)} className="item">
          productos
        </button>
      )}
      {!fromAbout && (
        <Link to="/about" className="item">
          Sobre Nosotros
        </Link>
      )}
    </div>
  );
};

export default Header;
