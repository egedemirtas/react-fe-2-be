import React from 'react'
import { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

export const Alert = () => {

  const githubContext = useContext(GithubContext);

  return (
    githubContext.alert && (
      <div className='alert bg-danger'>
        <i className="fa-solid fa-rectangle-xmark"></i> {githubContext.alert}
      </div>
    )
  )
}
export default Alert
