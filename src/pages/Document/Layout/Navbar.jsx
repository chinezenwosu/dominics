import React from 'react'
import { useParams } from 'react-router-dom/dist'
import { pdfExporter } from 'quill-to-pdf'
import { saveAs } from 'file-saver'
import { routes } from '../../../utils'
import Logo from '../../../assets/images/logo.svg'
import styles from './Navbar.module.css'

const Navbar = ({ editor }) => {
  const { id } = useParams()

  if (!id) return null

  const exportAsPDF = async () => {
    if (editor) {
      const delta = editor.getContents()
      const pdfAsBlob = await pdfExporter.generatePdf(delta)
      saveAs(pdfAsBlob, `dominics-${id}.pdf`)
    }
  }

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
        <li>
          <button className={styles.navLink} onClick={exportAsPDF}>Export PDF</button>
        </li>
        <li>
          <a className={styles.navLink} href={routes.getHome()}>Go home</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar