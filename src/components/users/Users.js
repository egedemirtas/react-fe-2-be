import React from 'react'
import UserItem from './UserItem'
import { Spinner } from '../layout/Spinner'

const Users = (props) => {

console.log("usersss: " + props.loading)
  if (props.loading) {
    return (<Spinner />);
  } else if (!props.loading && props.users.length === 0 ) {
    return (<div></div>)
  } else {
    return (
      <div className="bg-light" style={{ margin: '1rem 0', padding: '1rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '1.5rem', rowGap: '0rem' }}>
        {props.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }

}


export default Users