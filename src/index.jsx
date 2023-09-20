import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import { routes } from './utils'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: routes.getHome(),
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.getDocument(':id'),
      },
    ],
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root')
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
