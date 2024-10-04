import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('useremail');
        console.dir(`Fetching orders for:${email}`);

        try {
            let response = await fetch("http://localhost:2000/api/userorder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            let data = await response.json();
            console.log("Fetched order data:", data);

            setOrderData(data.order_data || []); // Fallback to empty array if no orders
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />

            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((order, index) => (
                            <div key={index}>
                                {order.length > 0 && (
                                    <div className='my-5'>
                                        <h4 className="text-lg font-bold text-gray-800">Order Date: {order[0].Order_date}</h4>
                                        <hr className="my-2 border-gray-300" />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {order.slice(1).map((item, idx) => (
                                        <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                            
                                            <div className="p-4">
                                                <h5 className="text-lg font-semibold text-gray-900">{item.name}</h5>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                                    
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-sm text-gray-600">Price:</span>
                                                    <span className="text-lg font-semibold text-green-600">₹{item.price}/-</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-10">
                            <h2 className="text-3xl font-semibold text-gray-700">No Orders Found!</h2>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
