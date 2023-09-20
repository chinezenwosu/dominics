import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import io from 'socket.io-client'
import Toolbar, { toolbarModule } from './Toolbar'
import config from '../../config'
import { debounce } from '../../utils'
import 'react-quill/dist/quill.snow.css'

const Document = () => {
  const editorRef = useRef()
  const [socket, setSocket] = useState(null)
  const { id: docId } = useParams()
  const modules = { toolbar: toolbarModule }

  useEffect(() => {
    const soc = io(config.url.socket)
    setSocket(soc)

    return () => {
      soc.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket === null) return

    socket.once('load-document', (document) => {
      editorRef.current.getEditor().setContents(document)
      editorRef.current.getEditor().enable()
    })

    socket.emit('get-document', docId)
  }, [socket, docId])

  useEffect(() => {
    if (socket === null) return
  
    const handler = (delta) => {
      editorRef.current.getEditor().updateContents(delta)
    }

    socket.on('receive-document-changes', handler)

    return () => {
      socket.off('receive-document-changes', handler)
    }
  }, [socket])

  const onChange = (_content, delta, source, editor) => {
    if (socket === null || source !== 'user') return

    socket.emit('send-document-changes', delta)

    debounce(() => {
      socket.emit('save-document', editor.getContents())
    }, 3000)()
  }

  return (
    <>
      <Toolbar />
      <ReactQuill
        ref={editorRef}
        theme="snow"
        readOnly={true}
        value="Loading document..."
        onChange={onChange}
        modules={modules}
      />
    </>
  )
}

export default Document
