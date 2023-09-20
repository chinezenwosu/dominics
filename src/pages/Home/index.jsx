import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils'
import Button from '../../components/Button'
import styles from './Home.module.css'

const Home = () => {
  const navigate = useNavigate()

  const addDocument = () => {
    const id = crypto.randomUUID()
    navigate(routes.getDocument(id))
  }

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Button label="Create new document" onClick={() => addDocument()} />
      </div>
    </div>
  )
}

export default Home
