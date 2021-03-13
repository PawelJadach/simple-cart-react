import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    cart: [],
    error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setError":
      return {...state, error: action.payload };
    case "addToCart":
      return {...state, cart: [...state.cart, action.payload]};
    case "changeCount":
      return {
        ...state,
        cart: state.cart.map(
          item => item.pid === action.payload.pid ? { ...item, count: action.payload.newCount } : item
        )
      };
    case "removeByPid":
      return {
        ...state,
        cart: state.cart.filter(item => item.pid !== action.payload)
      };
    default:
      return state;
  }
}

const CartContextProvider = (props) => {
  const [state, setState] = useReducer(reducer, initialState);

  const addToCart = product => {
    const productInCart = state.cart.find(item => item.pid === product.pid);

    if(productInCart) {
      const isMaxInCart = productInCart.count >= product.max;

      if(isMaxInCart) {
        window.alert(`Maksymalna liczba ${product.name} w koszyku to ${product.max}!`)
      } else {
        setState({ type: 'changeCount', payload: { pid: product.pid, newCount: product.count + 1 }});
      }
    } else {
      setState({ type: 'addToCart', payload: { ...product, count: 1 }});
    }
  };

  const addOne = product => {
    setState({ type: 'changeCount', payload: { pid: product.pid, newCount: product.count + 1 }});
  };

  const removeOne = product => {
    setState({ type: 'changeCount', payload: { pid: product.pid, newCount: product.count -1 }});
  };

  const removeFromCart = product => {
    setState({ type: 'removeByPid', payload: product.pid });
  };

  const setCount = (pid, newCount) => {
    setState({ type: 'changeCount', payload: { pid, newCount }});
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        addOne,
        removeOne,
        removeFromCart,
        setCount,
      }}
    >
        {props.children}
    </CartContext.Provider>
  )
}

export {
  CartContext,
  CartContextProvider,
}