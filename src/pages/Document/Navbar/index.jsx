import React from 'react'
import { routes } from '../../../utils'
import NameInput from './NameInput'
import PDFExportButton from './PDFExportButton'
import EditorModeButton from './EditorModeButton'
import Logo from '../../../assets/images/logo.svg'
import styles from './Navbar.module.css'

const Navbar = ({ editorRef, socket }) => {
  const editor = editorRef?.current?.getEditor()

  return (
    <nav className={styles.nav}>
      <div className={styles.navHead}>
        <div className={styles.logoContainer}>
          <a href={routes.getHome()}>
            <img src={Logo} className={styles.logo} />
          </a>
          <NameInput editor={editor} socket={socket} />
        </div>
        <label htmlFor="menu-toggle">
          <div className={styles.toggleIcon}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </label>
      </div>
      <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
      <ul className={styles.navLinks}>
        <li>
          <EditorModeButton className={styles.navButton} editor={editor} />
        </li>
        <li>
          <PDFExportButton className={styles.navButton} editor={editor} />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
