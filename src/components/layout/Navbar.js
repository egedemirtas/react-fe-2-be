import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// you would want to use <a> for raouting/navigation beacuse it will delete the state if you go back in navigation
//use links instead to save states through routing
const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-dark'>
      <Link to='/' style={{ marginLeft: '25rem' }}>
        <i className={icon}></i>
        <h3 style={{ display: 'inline', marginLeft: '1rem' }}>{title}</h3>
      </Link>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fa-sharp fa-solid fa-code-branch'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar