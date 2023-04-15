import React, { useState } from 'react';
import { IMenuItems } from './sidemenu.types'; 
import { faGamepad, faUser } from "@fortawesome/free-solid-svg-icons";
import { IconBase } from '../../components';

const SideMenu = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuItems: IMenuItems[] = [
    {
      title: 'Games',
      key: 'games',
      icon: <IconBase icon={faGamepad} />,
    },
    {
      title: 'Users',
      key: 'users',
      icon: <IconBase icon={faUser} />,
    }
  ]

  return (
    <div className="bg-background-secondary">          
      <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 dark:text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-2 py-4 overflow-y-auto bg-background-secondary">
            <a href="/" className="flex items-center pl-2.5 pb-2 mb-2 border-b border-slate-700">
              <img src="/src/assets/logo.png" className="h-16 mr-3" alt="Game Dashboard Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Dashboard</span>
            </a>
            <ul className="space-y-2 font-medium">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
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