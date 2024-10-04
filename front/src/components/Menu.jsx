import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Menu() {
    const [category, setCategory] = useState([])
    const [foodMenu, setFoodMenu] = useState([]);
    const [error, setError] = useState(null);  // State to handle errors

    const fetchData = async () => {
        try {
            let res = await fetch("http://localhost:2000/api/displaymenu", {
                method: 'GET',
                headers: { 'Content-Type': 'applcation/json' }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const text = await res.text();  // Get response text
            if (text) {
                const data = JSON.parse(text);  // Parse JSON manually

                setFoodMenu(data);  // Update state with data
                const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
                setCategory(uniqueCategories);
            }
            else {
                console.warn('Received empty response body');
                setFoodMenu([]);  // Set empty array if no data
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);  // Set error message
        }
    };

    useEffect(() => {
        fetchData();  // Call fetchData when component mounts
    }, []);  // Empty dependency array ensures this runs only once

    return (
        <div className=' text-white bg-gray-900'>
            <h1 className='font-semibold text-2xl p-3 text-center text-white bg-gray-900'>Food Menu</h1>
            {error && <p>Error: {error}</p>}
            <div>
                {category.length > 0 ? (
                    category.map((categoryItem, index) => (
                        <div>
                            <h1 key={index} className='text-xl p-2 max-w-screen-xl mx-auto  text-white bg-gray-700'>{categoryItem}</h1>
                            <div className='flex flex-wrap max-w-screen-xl mx-auto '>
                            {foodMenu.length > 0 ? (
                                foodMenu.filter(item => item.category === categoryItem).map((item, i) => (
                                    
                                    <div className='m-2'>
                                        {/* <p  key={item._id} className=''>
                                            {i + 1}. {item.food_name} - ${item.price}
                                        </p> */}
                                        <Card detail={item} />
                                    </div>
                                ))
                            ) : (
                                <p>No items available</p>  // Message for empty menu
                            )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>
        </div>
    );
}
