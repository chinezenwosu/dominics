import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils'

const Home = () => {
  const navigate = useNavigate()

  const addDocument = () => {
    const id = crypto.randomUUID()
    navigate(routes.getDocument(id))
  }

  return (
    <button onClick={() => addDocument()} />
  )
}

export default Home
