import React, { createContext, useReducer, useContext } from 'react';

// Create context for state and dispatch
const CartStateConT = createContext();
const CartDispatchConT = createContext();

// Reducer function to manage cart state
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Logic to handle adding items to the cart
      return [...state, action.payload]; // Example logic, change as needed
    case 'REMOVE':
      let newArr=[...state]
      newArr.splice(action.index,1)
      return newArr
      case 'DROP':
        let Arr=[]
        return Arr
    default:
      return state;
  }
};

// CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); // Initial state is an empty array (cart items)

  return (
    <CartDispatchConT.Provider value={dispatch}>
      <CartStateConT.Provider value={state}>
        {children}
      </CartStateConT.Provider>
    </CartDispatchConT.Provider>
  );
};

// Custom hooks to use the cart state and dispatch
export const useCart = () => useContext(CartStateConT);
export const useDisp = () => useContext(CartDispatchConT);
