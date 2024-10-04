import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='p-4 bg-gray-900 '>
            <footer className="bg-gray-600 rounded-lg shadow ">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="https://flowbite.com/" className="italic hover:underline">Goofy™</Link>. All Rights Reserved.</span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
