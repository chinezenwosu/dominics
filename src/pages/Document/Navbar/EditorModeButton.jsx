import React, { useState } from 'react'

const EditorModeButton = ({ className, editor }) => {
  const [isEditable, setIsEditable] = useState(true)

  const switchMode = () => {
    setIsEditable((prev) => {
      const newValue = !prev
      editor.enable(newValue)
      return newValue
    })
  }

  return (
    <button className={className} onClick={switchMode}>
      Switch to { isEditable ? 'view' : 'edit' } mode
    </button>
  )
}

export default EditorModeButton
