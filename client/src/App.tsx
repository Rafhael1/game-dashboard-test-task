import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import Routes from './router'

import SideMenu from './layout/sidemenu/sidemenu'

import { CustomerProvider } from './context/customerContext'
import { CategoriesProvider } from './context/categoriesContext';
import { GamesProvider } from './context/gamesContext';


function App() {
  return (
    <div className="m-0 max-w-screen min-h-screen bg-background">
      <GamesProvider>
        <CategoriesProvider>
          <CustomerProvider>
            <BrowserRouter>
              <SideMenu />
              <main className="p-4 mobile:ml-0 ml-64 overflow-hidden">
                <Routes />
              </main>
            </BrowserRouter>
          </CustomerProvider>
       </CategoriesProvider>
      </GamesProvider>
    </div>
  )
}

export default App
