import React from 'react'

const Button = ({ children, onClick, color, ...props }: any) => {
  
    const getColor = () => {
      switch (color) {
        case 'success':
          return 'bg-green-500 hover:bg-green-600';
        case 'danger':
          return 'bg-red-500 hover:bg-red-600';
        case 'warning':
          return 'bg-yellow-500 hover:bg-yellow-600';
        case 'info':
          return 'bg-blue-500 hover:bg-blue-600';
        default:
          return 'bg-primary hover:bg-indigo-600';
      }
    };
  
    return (
        <button
          id='dropdownRadioButton'
          data-dropdown-toggle='dropdownRadio'
          className={`${getColor()} pt-2 pb-2 pr-6 pl-6 transition-colors items-center focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1.5 bg-primary text-white hover:bg-indigo-600 hover:border-ray-600 focus:ring-indigo-700`}
          type='button'
          onClick={onClick}
        >
        {children}
      </button>
    )
}

export default Button