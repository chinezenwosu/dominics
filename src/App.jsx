import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Layout/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
