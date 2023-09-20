import React from 'react'

const Select = ({ defaultValue, options, className }) => {
  return (
    <select className={className} defaultValue={defaultValue}>
      {
        options.map((option) => (
          <option key={option.value} value={option.value}>{ option.label }</option>
        ))
      }
    </select>
  )
}

export default Select
