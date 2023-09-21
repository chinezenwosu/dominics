import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import Toolbar from './components/Toolbar'
import config from '../../config'
import 'react-quill/dist/quill.snow.css'
import styles from './Document.module.css'
import Navbar from './components/Navbar'
import TextEditor from './components/TextEditor'

// Also update socketEmissions in /ioServer.js
export const socketEmissions = {
  GET_DOCUMENT: 'GET_DOCUMENT',
  LOAD_DOCUMENT: 'LOAD_DOCUMENT',
  SEND_DOCUMENT_CONTENT_CHANGES: 'SEND_DOCUMENT_CONTENT_CHANGES',
  SEND_DOCUMENT_NAME_CHANGES: 'SEND_DOCUMENT_NAME_CHANGES',
  RECEIVE_DOCUMENT_CONTENT_CHANGES: 'RECEIVE_DOCUMENT_CONTENT_CHANGES',
  RECEIVE_DOCUMENT_NAME_CHANGES: 'RECEIVE_DOCUMENT_NAME_CHANGES',
  SAVE_DOCUMENT_CONTENT: 'SAVE_DOCUMENT_CONTENT',
  SAVE_DOCUMENT_NAME: 'SAVE_DOCUMENT_NAME',
}

const Document = () => {
  const editorRef = useRef()
  const [socket, setSocket] = useState(null)
  const { id: docId } = useParams()

  useEffect(() => {
    const soc = io(config.url.socket)
    setSocket(soc)

    return () => {
      soc.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket === null) return

    socket.emit(socketEmissions.GET_DOCUMENT, docId)
  }, [socket, docId])

  return (
    <>
      <Navbar editorRef={editorRef} socket={socket} />
      <main className={styles.container}>
        <Toolbar />
        <TextEditor editorRef={editorRef} socket={socket} />
      </main>
    </>
  )
}

export default Document
