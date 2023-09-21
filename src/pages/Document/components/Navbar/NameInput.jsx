import React, { useState, useEffect } from 'react'
import { debounce } from '../../../../utils'
import styles from './NameInput.module.css'
import { socketEmissions } from '../..'

const NameInput = ({ editor, socket }) => {
  const [documentName, setDocumentName] = useState('')

  useEffect(() => {
    if (socket === null) return

    socket.once(socketEmissions.LOAD_DOCUMENT, (document) => {
      setDocumentName(document.name || '')

      editor.setContents(document.content)
      editor.enable()

      if (!document.content) {
        editor.focus()
      }
    })
  }, [socket])

  useEffect(() => {
    if (socket === null) return
  
    const nameHandler = (data) => {
      setDocumentName(data)
    }

    socket.on(socketEmissions.RECEIVE_DOCUMENT_NAME_CHANGES, nameHandler)

    return () => {
      socket.off(socketEmissions .RECEIVE_DOCUMENT_NAME_CHANGES, nameHandler)
    }
  }, [socket])

  const handleNameChange = (e) => {
    if (socket === null) return

    const name = e.target.value
    setDocumentName(name)

    socket.emit(socketEmissions.SEND_DOCUMENT_NAME_CHANGES, name)

    debounce(() => {
      socket.emit(socketEmissions.SAVE_DOCUMENT_NAME, name)
    }, 3000)()
  }

  return (
    <input
      type="text"
      value={documentName}
      onChange={handleNameChange}
      spellCheck={false}
      autoComplete="off"
      className={styles.documentName}
      placeholder="Untitled document"
    />
  )
}

export default NameInput
