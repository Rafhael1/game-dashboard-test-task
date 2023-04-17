import { useState, useEffect } from 'react';

function useDeviceType() {
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      const newDeviceType = screenWidth < 768 ? 'mobile' : 'desktop';
      setDeviceType(newDeviceType);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
}

export default useDeviceType;
