import React , {useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mainicon from '../assets/Mainicon.jpg'
import Modal from '../Modals';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
    let data=useCart()
    const [cartV,setCartV]=useState(false);
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("useremail")
        localStorage.removeItem("authtoken")
        navigate('/')
    }
    const loadCart=()=>{setCartV(true)}

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={Mainicon} className="h-8 rounded-full" alt="Flowbite Logo" />
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white italic">ShiZZle</span>
                    </Link>
                    <div className=" w-auto" id="navbar-default">
                        <ul className="font-medium flex  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
                            </li>
                            {(localStorage.getItem('authtoken'))?
                            <li>
                                <Link to="/myorder" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">My Orders</Link>
                            </li> :""}
                            {(!localStorage.getItem('authtoken'))?<>
                            <li>
                                <Link to="/signup" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign up</Link>
                            </li>
                            <li>
                                <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                            </li>
                            </>:<>
                            <li>
                                <div onClick={()=>setCartV(true)} className="inline-flex items-start py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    My cart
                                    <p className=' text-white text-[9px] rounded-full border-[1px] bg-red-800 border-gray-200  w-4 h-4 inline-flex justify-center items-center'>{data.length}</p>
                                </div>
                                <div>{cartV?<Modal onClose={()=>(setCartV(false))}><Cart></Cart></Modal>:null}</div>
                            </li>
                            <li>
                                <div onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</div>
                            </li></>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
