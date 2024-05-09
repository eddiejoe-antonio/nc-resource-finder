import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  message: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative'
    >
      {children}
      {isHovered && (
        <div className='tooltip-content bg-black text-white text-sm p-4 rounded absolute z-10 -top-10 left-1/2 transform -translate-x-1/2'>
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
