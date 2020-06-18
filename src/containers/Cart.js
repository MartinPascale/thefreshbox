import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import BottomBar from '../components/BottomBar';

import { setCart } from '../reducers/actions';

import boxPhoto from '../assets/fruit-box.png';
import close from '../assets/close.svg';
import trash from '../assets/trash.svg';

import '../styles/Cart.scss';

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let cart = useSelector((state) => state.toJS().cart);
  const total = useSelector((state) => state.toJS().cart.total);
  const list = cart.products;

  const handleQtyChange = (box, amount) => {
    if (amount === 0) {
      cart.products = list.filter((obj) => obj.id !== box.id);
    } else {
      const newQuantity = amount + (box.quantity || 0);
      const objIndex = list.findIndex((obj) => obj.id === box.id);
      cart.products[objIndex].quantity = newQuantity;
      cart.total = cart.products.reduce(
        (curr, { total, quantity }) => curr + total * quantity,
        0
      );
    }
    dispatch(setCart(cart));
  };

  return (
    <div className='cart'>
      <div className='cart__title'>Carrito</div>
      <img
        className='checkout__close'
        src={close}
        height={18}
        width={18}
        onClick={() => history.push('/')}
      />
      <div className='cart__items'>
        <div className='cart__items__title'>items</div>
        <div className='cart__items__list'>
          {list &&
            list.length > 0 &&
            list.map((box) => (
              <div className='list__item'>
                <div className='list__item__left'>
                  <img src={boxPhoto} height={70} width={90} />
                </div>
                <div className='list__item__right'>
                  <div className='list__item__right__title'>
                    {box.name}
                    <button
                      className='list__item__right__title__delete'
                      onClick={() => {
                        handleQtyChange(box, 0);
                      }}
                    >
                      <img src={trash} alt='delete from cart' />
                    </button>
                  </div>
                  <div className='list__item__right__items'>
                    {box.items.map((item) => (
                      <div className='list__item__right__items__name'>
                        {box.name === 'TU BOX'
                          ? item.name
                          : `${item.split(',')[0]}`}
                      </div>
                    ))}
                  </div>
                  <div className='list__item__right__price'>
                    ${box.name === 'TU BOX' ? box.Total : box.total}
                  </div>
                  <div className='list__item__right__quantity-row'>
                    <button
                      className='list__item__right__quantity-row__button'
                      onClick={() => {
                        handleQtyChange(box, -1);
                      }}
                      disabled={box.quantity <= 1}
                    ></button>
                    {box.quantity}
                    <button
                      className='list__item__right__quantity-row__button'
                      onClick={() => {
                        handleQtyChange(box, 1);
                      }}
                    ></button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <BottomBar total={total} link='/checkout' />
    </div>
  );
};

export default Cart;
