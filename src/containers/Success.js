import React from 'react';
import { Link } from 'react-router-dom';

import success from '../assets/success.svg';

import '../styles/Success.scss';

const Success = () => {
  return (
    <div className='success'>
      <img src={success} />
      <div className='success__title'>Orden realizada!</div>
      <div className='success__description'>
        Su orden fue realizada con éxito, en breves nos comunicaremos con usted
        para confirmar la orden!
      </div>
      <Link to='/' className='success__btn'>
        volver al sitio
      </Link>
    </div>
  );
};

export default Success;
