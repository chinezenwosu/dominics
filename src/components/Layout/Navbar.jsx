import React from 'react'
import { useParams } from 'react-router-dom/dist'
import { routes } from '../../utils'
import Logo from '../../assets/images/logo.svg'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { id } = useParams()

  if (!id) return null

  return (
    <nav className={styles.nav}>
      <div className={styles.navHead}>
        <img src={Logo} className={styles.logo} />
        <label for="menu-toggle">
          <div className={styles.toggleIcon}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </label>
      </div>
      <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
      <ul className={styles.navLinks}>
        <li><a href={routes.getHome()}>Home</a></li>
      </ul>
    </nav>
  )
}

export default Navbar