import React from 'react'
import RepoItem from './RepoItem'

const Repos = ({ repos }) => {
  return (
    <div className='card'>
      {
        repos.length !== 0 ? repos.map(repo => <RepoItem repo={repo} key={repo.id}/>) : <div>User does not have public repositories yet</div>
      }
    </div>

  );
}

export default Repos