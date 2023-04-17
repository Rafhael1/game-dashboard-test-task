import React, { ReactElement } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface IconBaseProps extends FontAwesomeIconProps {
  className?: string;
};

const IconBase = ({ icon, className, size, flip, ...props }: IconBaseProps) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      flip={flip}
      className={`transition duration-75 text-gray-50 group-hover:text-white ${className}`}
      {...props}
    />
  );
};

export default IconBase;