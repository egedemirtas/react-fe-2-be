import React from 'react'

export const Alert = ( {alert} ) => {
    console.log(alert)
  return (
    alert !== null && (
        <div className='alert bg-danger'>
            <i className="fa-solid fa-rectangle-xmark"></i> {alert}
        </div>
    )
  )
}
export default Alert
