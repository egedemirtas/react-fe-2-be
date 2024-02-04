import React from 'react'

export const Alert = (props) => {

  return (
    props.alert && (
      <div className='alert bg-danger'>
        <i className="fa-solid fa-rectangle-xmark"></i> {props.alert}
      </div>
    )
  )
}
export default Alert
