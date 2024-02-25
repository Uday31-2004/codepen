

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {Home} from './pages'


export const App = () => {
  return (
    <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
      <Routes>
        <Route path="/home/*" element={<Home />} />

        {/* if route is not matching*/}
        <Route path='*' element={<Navigate to={"/home"}/>} />
      </Routes>
    </div>
  )
}
