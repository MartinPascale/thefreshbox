import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  isLoading: false,
  isScrolled: window.pageYOffset > window.innerHeight,
  products: {
    fruits: [],
    vegetables: [],
  },
  boxes: [],
  userInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
  },
  cart: {
    total: 0,
    products: [],
  },
  checkout: {
    paymentMethod: 'EFECTIVO',
    notes: '',
  },
});

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case constants.IS_LOADING:
      return state.set('isLoading', action.payload.isLoading);

    case constants.SET_IS_SCROLLED:
      return state.set('isScrolled', action.payload.isScrolled);

    case constants.SET_PRODUCTS:
      return state.set('products', action.payload.products);

    case constants.SET_BOXES:
      return state.set('boxes', action.payload.boxes);

    case constants.SET_USER_INFO:
      return state.set('userInfo', action.payload.userInfo);

    case constants.SET_CART:
      return state.set('cart', action.payload.cart);

    case constants.SET_PAYMENT_METHOD:
      return state.set('checkout', {
        ...state.toJS().checkout,
        paymentMethod: action.payload.paymentMethod,
      });

    default:
      return state;
  }
}

export default mainReducer;
