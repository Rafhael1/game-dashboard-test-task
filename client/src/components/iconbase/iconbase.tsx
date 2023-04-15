import React, { ReactElement } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface IconBaseProps extends FontAwesomeIconProps {
  className?: string;
};

const IconBase = ({ icon, className, ...props }: IconBaseProps) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className=" w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      {...props}
    />
  );
};

export default IconBase;