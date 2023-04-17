import React, { useEffect, useRef, useState } from 'react';
import { IMenuItems } from './sidemenu.types'; 
import { faGamepad, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { IconBase } from '../../components';
import useDeviceType from '../../hooks/useDeviceType';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (deviceType === 'mobile'){
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [deviceType]);
  
  const matchLocation = (path: string) => {
    const location = window.location.pathname === path;
    return location;
  };
  
  const handleOutsideClick = () => {
    if (deviceType === 'mobile'){
      setIsSidebarOpen(false);
    };
  }; 
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const backdropRef = useRef<HTMLDivElement>(null) 
  useOutsideClick(backdropRef, handleOutsideClick);
  
  const menuItems: IMenuItems[] = [
    {
      title: 'Customers',
      key: 'users',
      icon: <IconBase icon={faUser} />,
      path: '/',
    },
    {
      title: 'Games',
      key: 'games',
      icon: <IconBase icon={faGamepad} />,
      path: '/games',
    },
  ]

  return (
    <div ref={backdropRef} className="bg-background-secondary">          
      <button onClick={() => toggleSidebar()} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-0 ml-3 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 dark:text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
        <IconBase icon={faBars} size='lg' />
      </button>
      <aside id="logo-sidebar" className={`${isSidebarOpen ? '' : 'hidden'} transition-all fixed top-0 mobile:left-[65%] left-0 z-40 w-64 h-screen -translate-x-full sm:translate-x-0`} aria-label="Sidebar">
        <div className="h-full px-2 py-4 overflow-y-auto bg-background-secondary">
            <a href="/" className="flex items-center pl-2.5 pb-2 mb-2 border-b border-slate-700">
              <img src="/src/assets/logo.png" className="h-16 mr-3" alt="Game Dashboard Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Dashboard</span>
            </a>
            <ul className="space-y-2 font-medium">
              {menuItems.map((item) => (
                <li onClick={() => navigate(item.path)} className='cursor-pointer' key={item.key}>
                  <a className={`${matchLocation(item.path) ? 'bg-primary hover:bg-indigo-500' : 'hover:bg-gray-700' } flex items-center p-2 rounded-lg text-white `}>
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
        </div>
      </aside>
    </div>
  )
};

export default SideMenu;