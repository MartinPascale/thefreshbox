import React, { useState } from 'react';

import cartPlus from '../assets/cart-plus.svg';
import cartCheck from '../assets/cart-check.svg';

import '../styles/Catalogo.scss';

const ProductCard = ({ item, handleAddToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = () => {
    if (!addedToCart) {
      handleAddToCart(item, addedToCart);
      setAddedToCart(true);
    } else {
      handleAddToCart(item, addedToCart);
      setAddedToCart(false);
    }
  };

  return (
    <div
      onClick={addItem}
      className='catalogo-list__category__item'
      key={item.id}
    >
      <div className='catalogo-list__category__item__image'>
        <img src={item.Image} height={75} width={75} />
        <img
          onClick={addItem}
          className='catalogo-list__category__item__add-to-cart'
          src={!addedToCart ? cartPlus : cartCheck}
          height={30}
          width={30}
        />
      </div>
      <div className='catalogo-list__category__item__bottom'>
        <div className='catalogo-list__category__item__bottom__name'>
          {item.Item}
        </div>
        <div className='catalogo-list__category__item__bottom__data'>
          <div>${item.Precio}</div>
          <div>{item.Unidad}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
