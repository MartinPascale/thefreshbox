import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { setCart } from "../reducers/actions";

import arrow from "../assets/arrow.svg";

const BottomBar = ({
  isCatalogo,
  items,
  isCheckout,
  link,
  action,
  validCheckout,
}) => {
  let itemsTotal = 0;

  const dispatch = useDispatch();
  let cart = useSelector((state) => state.toJS().cart);
  const total = useSelector((state) => state.toJS().cart.total);

  if (isCatalogo) {
    const pricesArray = items.map((obj) => parseInt(obj.Precio));
    itemsTotal = pricesArray.reduce((a, b) => a + b, 0);
  }

  const handleClick = () => {
    if (action) {
      action();
    } else if (isCatalogo) {
      const formatedItems = items.map((obj) => {
        return {
          name: obj.Item,
          amount: obj.Unidad,
          price: obj.Precio,
        };
      });

      const box = {
        name: "TU BOX",
        items: formatedItems,
        total: itemsTotal,
      };

      cart.products = [...cart.products, box];
      cart.total = cart.total + box.total;
      dispatch(setCart(cart));
    }
  };

  return (
    <div className="cart__bottom">
      <div className="cart__bottom__left">
        <div className="cart__bottom__left__total">Total</div>
        <div className="cart__bottom__left__amount">
          ${isCatalogo ? itemsTotal : total}
        </div>
        <div className="cart__bottom__left__envio">Envio Gratis</div>
      </div>
      <Link
        to={link}
        onClick={handleClick}
        className={classNames("cart__bottom__button", {
          "cart__bottom__button--disabled": isCheckout && !validCheckout,
        })}
      >
        {isCatalogo ? "Add to Cart" : "checkout"}
        {isCheckout ? (
          <img src={arrow} />
        ) : (
          <div className="cart__bottom__button__quantity">
            {isCatalogo ? items.length || 0 : cart.products.length}
          </div>
        )}
      </Link>
    </div>
  );
};

export default BottomBar;
