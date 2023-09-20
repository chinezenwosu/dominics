import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import Toolbar, { toolbarModule } from './Toolbar'
import 'react-quill/dist/quill.snow.css'

const Document = () => {
  const [value, setValue] = useState(null)
  const { id } = useParams()
  const modules = { toolbar: toolbarModule }

  const onChange = (content) => {
    setValue(content)
  }

  return (
    <>
      <Toolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </>
  )
}

export default Document
