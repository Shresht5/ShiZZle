import React, { useState } from 'react';
import Mainicon from '../assets/healthy.jpg';
import { useDisp, useCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDisp(); // This should return the correct dispatch function
  
  const [qty, setQty] = useState(1);
  const [cost, setCost] = useState(props.detail.price);
  let data = useCart();
  const handleAddCart = async () => {
    await dispatch({
      type: 'ADD',
      payload: {
        id: props.detail.id, // Assuming each item has a unique id
        name: props.detail.food_name,
        price: props.detail.price,
        quantity: qty,
        totalPrice: qty * props.detail.price, // Calculate total price based on quantity
      },
    });
    
    console.dir(data); // This will log the current cart state
  };

  return (
    <div className='w-[304px] flex flex-wrap text-black bg-slate-300 border-2 border-white'>
      <img src={Mainicon} className='w-[248px] mx-auto m-7 rounded-xs hover:scale-110 duration-300' alt='not found' />
      <div className='m-2'>
        <h5 className='font-bold'>{props.detail.food_name}</h5>
        <p>There is some text</p>
        <div className=''>
          <select 
            onChange={(e) =>{ setQty(e.target.value);setCost(e.target.value*props.detail.price)}} 
            className='bg-gray-800 text-white border-white rounded-md mr-1'
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <div className='inline-block'>
            <strong>Price : {cost}</strong>
          </div>
          <hr />
          <button
            onClick={handleAddCart} // Pass the function reference correctly
            className='w-full border-gray-600 border-2 text-black shadow-2xl bg-primary-600 opacity-90 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
