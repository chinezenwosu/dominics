import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import { routes } from './utils'

const router = createBrowserRouter([
  {
    path: routes.getHome(),
    element: <App />,
    children: [
      {
        index: true,
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
