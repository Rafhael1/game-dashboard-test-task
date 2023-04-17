import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  icon?: 'edit' | 'delete';
  children?: React.ReactNode;
  color?: 'success' | 'danger' | 'warning' | 'info';
}

const IconButton = ({ children, onClick, color }: IconButtonProps) => {

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
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <button onClick={onClick} className={`${getColor()} rounded-lg p-2 pl-3 pr-3`}>
      {children}
    </button>
  )
}

export default IconButton;