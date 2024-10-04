import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Mainicon from '../assets/Mainicon.jpg'

export default function Signup() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [alertMessage, setAlertMessage] = useState('');

  let navigate=useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:2000/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass })
      });
      const data = await res.json();
      console.log(data);
      // Check the response and set an alert message
      if (data.succes) {
        setAlertMessage('Login successful!');
        localStorage.setItem("authtoken",data.authtoken)
        localStorage.setItem("useremail",email)
        console.dir(localStorage.getItem('authtoken'))
        setTimeout(()=>{navigate('/')},1000)//settimeout is here
        
      } else {
        setAlertMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="../" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Mainicon} className="h-8 rounded-full" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white italic">Goofy</span>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
              </li>
              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter your Detatils
              </h1>
              {/* Conditionally render the alert message */}
              {alertMessage && (
                <div className={`p-4 mb-4 text-sm ${alertMessage.includes('successful') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
                  {alertMessage}
                </div>
              )}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={HandleSubmit}>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login here</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  not have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
