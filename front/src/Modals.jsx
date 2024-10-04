import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({ children, onClose }) => {
  return ReactDom.createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50"></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 z-50 h-[90%] w-[90%] p-5 rounded-lg shadow-lg overflow-auto">
        {/* Close Button */}
        <button
          className="text-white text-lg absolute top-4 right-4 hover:bg-red-500 bg-red-600 p-2 rounded-full"
          onClick={onClose}
        >
          X
        </button>

        {/* Modal Content */}
        <div className="text-white">{children}</div>
      </div>
    </>,
    document.getElementById('cart-root')
  )
}

export default Modal
