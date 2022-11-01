import React from 'react'
import UserItem from './UserItem'
import { Spinner } from '../layout/Spinner'
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  if (loading) {
    return (<Spinner />);
  } else if (!loading && users.length === 0) {
    return(<div></div>)
  } else {
    return (
      <div className="bg-light" style={{margin:'1rem 0', padding:'1rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '1.5rem', rowGap: '0rem' }}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }

}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users