import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from "classnames";

import boxPhoto from "../assets/fruit-box.png";
import efectivo from "../assets/efectivo.svg";
import mercadoPago from "../assets/mercado-pago.png";
import brou from "../assets/brou.jpg";
import close from "../assets/close.svg";

import BottomBar from "../components/BottomBar";
import RadioButton from "../components/RadioBUtton";

import { setCart, setPaymentMethod, setUserInfo } from "../reducers/actions";

import "../styles/Checkout.scss";

const Checkout = () => {
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.toJS().userInfo);
  const list = useSelector((state) => state.toJS().cart.products);
  const total = useSelector((state) => state.toJS().cart.total);
  const paymentMethod = useSelector(
    (state) => state.toJS().checkout.paymentMethod
  );

  const itemNames = list.map((item) => item.name);

  const [fullName, setFullName] = useState(userInfo.fullName);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [address, setAddress] = useState(userInfo.address);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState(itemNames.toString());

  const isValidCheckout =
    fullName !== "" &&
    email !== "" &&
    phone !== "" &&
    address !== "" &&
    items.length > 0;

  const handlePaymentChange = (method) => {
    dispatch(setPaymentMethod(method));
  };

  const handleBlur = (condition) => {
    setHasError(condition);

    dispatch(setUserInfo({ fullName, email, phone, address, items }));
  };

  const handleCheckOut = (e) => {
    const userInfo = {
      fullName: fullName,
      email: email,
      address: address,
    };

    setItems(itemNames.toString());

    const netlifyCheckout = {
      ...userInfo,
      paymentMethod,
      items,
      total,
    };

    if (isValidCheckout) {
      dispatch(setUserInfo(userInfo));

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "checkout", ...netlifyCheckout }),
      }).then(() => dispatch(setCart({ total: 0, products: [] })));
    } else {
      setHasError(true);
    }
  };

  return (
    <form className="checkout">
      <div className="checkout__title">Checkout</div>
      <img
        className="checkout__close"
        src={close}
        height={18}
        width={18}
        onClick={() => history.push("/")}
      />
      <div className="checkout__user-info">
        <div className="checkout__user-info__title">dirección de envío</div>
        <input
          name="fullName"
          className={classNames("checkout__user-info__input", {
            "checkout__user-info__input--error": hasError && fullName === "",
          })}
          placeholder="Nombre"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => handleBlur(fullName === "")}
        />
        <input
          name="address"
          className={classNames("checkout__user-info__input", {
            "checkout__user-info__input--error": hasError && !address,
          })}
          placeholder="Direccion"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => handleBlur(address === "")}
        />
        <div className="checkout__user-info__title">contacto</div>
        <input
          name="email"
          className={classNames("checkout__user-info__input", {
            "checkout__user-info__input--error": hasError && !email,
          })}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur(email === "")}
        />
        <input
          name="phone"
          className={classNames("checkout__user-info__input", {
            "checkout__user-info__input--error": hasError && !phone,
          })}
          placeholder="Teléfono"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => handleBlur(phone === "")}
        />
      </div>
      <div className="checkout__payment">
        <div className="checkout__payment__title">método de pago</div>
        {items && !items.length === 1 && (
          <div
            name="mercado"
            className="checkout__payment__item"
            onClick={() => handlePaymentChange("MERCADO_PAGO")}
          >
            <img src={mercadoPago} height={25} width={25} />
            <div className="checkout__payment__item__name">Mercado Pago</div>
            <div className="checkout__payment__item__info">
              Hasta 18 cuotas sin recargo
            </div>
            <RadioButton selected={paymentMethod === "MERCADO_PAGO"} />
          </div>
        )}
        <div
          name="transferencia"
          className="checkout__payment__item"
          onClick={() => handlePaymentChange("TRANSFERENCIA_BANCARIA")}
        >
          <img src={brou} height={25} width={25} />
          <div className="checkout__payment__item__name">
            Transferencia Bancaria
          </div>
          <div className="checkout__payment__item__info">A cuenta en BROU</div>
          <RadioButton selected={paymentMethod === "TRANSFERENCIA_BANCARIA"} />
        </div>
        <div
          className="checkout__payment__item"
          onClick={() => handlePaymentChange("EFECTIVO")}
        >
          <img src={efectivo} height={25} width={25} />
          <div className="checkout__payment__item__name">Efectivo</div>
          <div className="checkout__payment__item__info">
            Paga en el momento de la entrega
          </div>
          <div className="checkout__payment__item__radio">
            <RadioButton
              className="checkout__payment__radio"
              selected={paymentMethod === "EFECTIVO"}
            />
          </div>
        </div>
      </div>
      <div className="checkout__items">
        <div className="checkout__items__title">
          <div>items</div>
          <Link to="/cart" className="checkout__items__title__edit">
            Editar
          </Link>
        </div>
        <div className="checkout__items__list">
          {list.map((box) => (
            <div className="list__item">
              {console.log(box)}
              <div className="list__item__left">
                <img src={boxPhoto} height={70} width={90} />
              </div>
              <div className="list__item__right">
                <div className="list__item__right__title">{box.name}</div>
                <div className="list__item__right__items">
                  {box.items.map((item) => (
                    <div className="list__item__right__items__name">
                      {box.name === "TU BOX"
                        ? item.name
                        : `${item.split(",")[0]}`}
                    </div>
                  ))}
                </div>
                <div className="list__item__right__price">${box.total}</div>
                <div className="list__item__right__quantity-row">
                  X {box.quantity || 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div onClick={handleCheckOut}>
        <BottomBar
          isCheckout
          total={total}
          link="/success"
          validCheckout={isValidCheckout}
        />
      </div>
      <input name="total" value={total} hidden />
      <input name="items" value={items} hidden />
      <input name="paymentMethod" value={paymentMethod} hidden />
    </form>
  );
};

export default Checkout;
