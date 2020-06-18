import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCart } from '../reducers/actions';

import BottomBar from './BottomBar';

import boxPhoto from '../assets/fruit-box.png';
import cartPlus from '../assets/cart-plus.svg';
import cartCheck from '../assets/cart-check.svg';
import mercadoPagoIcon from '../assets/mercado-pago.png';

import '../styles/BoxCard.scss';

const BoxCard = ({ box }) => {
  const dispatch = useDispatch();

  const {
    id,
    name,
    total,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    isOffer,
    mercadoPago,
  } = box;
  const items = [product2, product3, product4, product5, product6, product7];
  const formatedBox = {
    id,
    name,
    total,
    items,
    isOffer,
    mercadoPago,
    quantity: 1,
  };

  let cart = useSelector((state) => state.toJS().cart);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const handleAddToCart = () => {
    if (!addedToCart) {
      cart.products = [...cart.products, formatedBox];
      cart.total = cart.total + parseInt(total);
      setCartTotal(cart.total);
      dispatch(setCart(cart));
      setAddedToCart(true);
    } else {
      cart.products = cart.products.filter((product) => product.id !== id);
      cart.total = cart.total - parseInt(total);
      setCartTotal(cart.total);
      dispatch(setCart(cart));
      setAddedToCart(false);
    }
  };

  return (
    <>
      <div className='box-card'>
        <div className='box-top'>
          <img
            className='box-top__image'
            src={boxPhoto}
            height={145}
            width={180}
          />
          <img
            onClick={handleAddToCart}
            className='box-top__add-to-cart'
            src={!addedToCart ? cartPlus : cartCheck}
            height={30}
            width={30}
          />
        </div>
        <div className='box-bottom'>
          <div className='box-bottom__name'>{name}</div>
          <div className='box-bottom__list'>
            {items &&
              items.map((item) => (
                <div className='box-bottom__list__row'>
                  <div className='box-bottom__list__row__item'>
                    {item.split(',')[0]}
                  </div>
                  <div className='box-bottom__list__row__item'>
                    {item.split(',')[1]}
                  </div>
                </div>
              ))}
          </div>
          <button
            className='box-bottom__button'
            onClick={() => (window.location.href = mercadoPago)}
          >
            <img
              className='box-bottom__button__img'
              src={mercadoPagoIcon}
              width={30}
              height={30}
            />
            ${total}
          </button>
        </div>
      </div>
      {cart.products.length > 0 && <BottomBar total={cartTotal} link='/cart' />}
    </>
  );
};

export default BoxCard;
