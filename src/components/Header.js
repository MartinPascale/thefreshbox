import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/Header.scss';

const Header = (props) => {
  const [contacto, setContacto] = useState();
  const catalogo = window.innerHeight + 600;
  const isScrolled = useSelector((state) => state.toJS().isScrolled);

  const scrollTo = (destination) => {
    window.scrollTo(0, destination);
  };

  useEffect(() => {
    setContacto(props.contactRef.current.offsetTop);
  }, []);

  return (
    <div
      className={
        isScrolled ? 'navigation' : 'navigation navigation--no-background'
      }
    >
      <button onClick={() => scrollTo(contacto)} className='item'>
        contacto
      </button>
      <button onClick={() => scrollTo(catalogo)} className='item'>
        productos
      </button>
      <Link to='/about' className='item'>
        Sobre Nosotros
      </Link>
    </div>
  );
};

export default Header;
