import React from 'react'
import { useParams } from 'react-router-dom/dist'

const Navbar = () => {
  const { id } = useParams()

  if (!id) return null

  return <div>Navbar</div>
}

export default Navbar