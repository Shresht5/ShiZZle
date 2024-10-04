import React from 'react';
// import Delete from '@material-ui/icons/Delete';
import { useCart, useDisp } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDisp();
  console.dir(data);

  if (data.length === 0) {
    return (
      <div className="m-5 w-full text-center text-3xl">
        The Cart is Empty!
      </div>
    );
  }
  
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('useremail');
    console.dir(userEmail)
    let response = await fetch('http://localhost:2000/api/orderdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_time: new Date().toDateString(),
      }),
    });
    if (response.status === 200) {
      dispatch({ type: 'DROP' });
    }
    
  };

  let totalPrice = data.reduce((total, food) => total + food.totalPrice, 0);

  return (
    <div className="container mx-auto mt-5">
      <div className="overflow-auto">
        <table className="min-w-full bg-white text-left">
          <thead className="text-green-500 text-xl">
            <tr>
              <th scope="col" className="px-4 py-2">#</th>
              <th scope="col" className="px-4 py-2">Name</th>
              <th scope="col" className="px-4 py-2">Quantity</th>
              
              <th scope="col" className="px-4 py-2">Amount</th>
              <th scope="col" className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="border-b text-black">
                <th scope="row" className="px-4 py-2">{index + 1}</th>
                <td className="px-4 py-2">{food.name}</td>
                <td className="px-4 py-2">{food.quantity}</td>
               
                <td className="px-4 py-2">{food.price}</td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => {
                      dispatch({ type: 'REMOVE', index: index });
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-2xl font-bold mt-4">Total Price: {totalPrice}/-</div>
      <div>
        <button
          className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-5"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
