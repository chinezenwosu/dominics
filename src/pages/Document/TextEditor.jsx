import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import { modules } from './Toolbar'
import { debounce } from '../../utils'
import { socketEmissions } from '.'
import styles from './TextEditor.module.css'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ socket, editorRef }) => {
  useEffect(() => {
    if (socket === null) return
  
    const contentHandler = (delta) => {
      editorRef.current.getEditor().updateContents(delta)
    }

    socket.on(socketEmissions.RECEIVE_DOCUMENT_CONTENT_CHANGES, contentHandler)

    return () => {
      socket.off(socketEmissions.RECEIVE_DOCUMENT_CONTENT_CHANGES, contentHandler)
    }
  }, [socket])

  const onChange = (_content, delta, source, editor) => {
    if (socket === null || source !== 'user') return

    socket.emit(socketEmissions.SEND_DOCUMENT_CONTENT_CHANGES, delta)

    debounce(() => {
      socket.emit(socketEmissions.SAVE_DOCUMENT_CONTENT, editor.getContents())
    }, 3000)()
  }

  return (
    <ReactQuill
      ref={editorRef}
      className={styles.editor}
      theme="snow"
      readOnly={true}
      value="Loading document..."
      onChange={onChange}
      modules={modules}
    />
  )
}

export default TextEditor
