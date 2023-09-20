import React from "react"
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <nav>
        Root app
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
