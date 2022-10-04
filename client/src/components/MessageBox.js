import React from 'react'

export default function MessageBox(props) {
  return (
    <div className={`background background-${props.variant ||'info' }`}>
      <div className={`alert alert-${props.variant ||'info' }`}>
          {props.children}
      </div>
    </div>
  )
}
