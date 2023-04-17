import React, { useEffect, useState } from 'react'
import useDeviceType from '../hooks/useDeviceType'

const NotFound = () => {

  return (
    <div className="text-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">Page not found</h2>
    </div>
  )
}

export default NotFound
