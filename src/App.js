

import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import {Home} from './pages'
import { auth } from './config/firebase.config'
import { useEffect } from 'react'

export const App = () => {

  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userCred =>{
      if(userCred){
        console.log(userCred?.providerData)
      }else{
        navigate("/home/auth",  {replace: true})
      }
    })
  }, [])
  

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
