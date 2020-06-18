import * as constants from './constants';

export const setIsLoading = (value) => ({
  type: constants.IS_LOADING,
  payload: {
    isLoading: value,
  },
});

export const setIsScrolled = (value) => ({
  type: constants.SET_IS_SCROLLED,
  payload: {
    isScrolled: value,
  },
});

export const setProducts = (fruits, vegetables) => ({
  type: constants.SET_PRODUCTS,
  payload: {
    products: {
      fruits: fruits,
      vegetables: vegetables,
    },
  },
});

export const setBoxes = (value) => ({
  type: constants.SET_BOXES,
  payload: {
    boxes: value,
  },
});

export const setCart = (value) => ({
  type: constants.SET_CART,
  payload: {
    cart: value,
  },
});

export const setPaymentMethod = (method) => ({
  type: constants.SET_PAYMENT_METHOD,
  payload: {
    paymentMethod: method,
  },
});

export const setUserInfo = ({ fullName, email, phone, address }) => ({
  type: constants.SET_USER_INFO,
  payload: {
    userInfo: {
      fullName,
      email,
      phone,
      address,
    },
  },
});
