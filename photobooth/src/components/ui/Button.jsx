/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';


const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled= false,
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100",
    danger: "bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;