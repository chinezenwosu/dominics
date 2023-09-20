import React, { useState } from 'react'
import { useParams } from 'react-router-dom/dist'
import { pdfExporter } from 'quill-to-pdf'
import { saveAs } from 'file-saver'
import { routes } from '../../../utils'
import Logo from '../../../assets/images/logo.svg'
import styles from './Navbar.module.css'

const Navbar = ({ editor }) => {
  const [isEditable, setIsEditable] = useState(true)
  const { id } = useParams()

  if (!id) return null

  const exportAsPDF = async () => {
    if (editor) {
      const delta = editor.getContents()
      const pdfAsBlob = await pdfExporter.generatePdf(delta)
      saveAs(pdfAsBlob, `dominics-${id}.pdf`)
    }
  }

  const switchMode = () => {
    setIsEditable((prev) => {
      const newValue = !prev
      editor.enable(newValue)
      return newValue
    })
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navHead}>
        <a href={routes.getHome()}>
          <img src={Logo} className={styles.logo} />
        </a>
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
          <button className={styles.navButton} onClick={switchMode}>
            Switch to { isEditable ? 'view' : 'edit' } mode
          </button>
        </li>
        <li>
          <button
            className={styles.navButton}
            onClick={exportAsPDF}
          >
            Export PDF
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar