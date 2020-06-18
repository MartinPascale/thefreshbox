import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import fetchProducts from '../helpers/fetchProducts';

import BottomBar from './BottomBar';

import '../styles/Catalogo.scss';
import ProductCard from './ProductCard';

const Catalogo = (props) => {
  const dispatch = useDispatch();
  const title = 'Catálogo:';

  const [showFruit, setShowFruit] = useState(false);
  const [showVegetable, setShowVegetable] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedItems, setAddedItems] = useState([]);

  const fruits = useSelector((state) => state.toJS().products.fruits);
  const vegetables = useSelector((state) => state.toJS().products.vegetables);

  useEffect(() => {
    fetchProducts(dispatch);
  }, []);

  const handleAddToCart = ({ id, Precio, Unidad, Item }, isAdded) => {
    if (!isAdded) {
      setAddedItems([...addedItems, { id, Item, Precio, Unidad }]);
      setAddedToCart(true);
    } else {
      setAddedItems(addedItems.filter((item) => item.id !== id));
      setAddedToCart(addedItems && addedItems.length > 0);
    }
  };

  return (
    <>
      <div className='catalogo-title'>{title}</div>
      <div ref={props.ref2} className='catalogo-list'>
        <div
          onClick={() => setShowFruit(true)}
          className={classNames('catalogo-list__category', {
            'catalogo-list__category--grid': showFruit,
          })}
        >
          {showFruit ? (
            fruits.map((fruit) => (
              <ProductCard item={fruit} handleAddToCart={handleAddToCart} />
            ))
          ) : (
            <div>Frutas</div>
          )}
        </div>
        <div
          onClick={() => setShowVegetable(true)}
          className={classNames('catalogo-list__category__2', {
            'catalogo-list__category--grid': showVegetable,
          })}
        >
          {showVegetable ? (
            vegetables.map((vegetable) => (
              <ProductCard item={vegetable} handleAddToCart={handleAddToCart} />
            ))
          ) : (
            <div>Verdura</div>
          )}
        </div>
      </div>
      {addedToCart && <BottomBar isCatalogo items={addedItems} link='/cart' />}
    </>
  );
};

export default Catalogo;
