import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      const data = await response.json();
      setUsers(data)
      setLoading(false);
    }

    fetchUsers()
  }, [])

  // search users
  const searchUsers = async text => {
    setLoading(true);
    const response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await response.json();
    if (!data.items) {
      return;
    }

    setUsers(data.items)
    setLoading(false)
  }

  const getUser = async (username) => {
    setLoading(true);
    const response = await fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await response.json();
    if (!data) {
      return;
    }
    setUser(data);
    setLoading(false);
  }

  const getUserRepos = async (username) => {
    setLoading(true);
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await response.json();
    if (!data) {
      return;
    }
    setRepos(data);
    setLoading(false);
  }

  // clear users
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  };

  // showAlert
  const showAlert = () => {
    setAlert("Enter a username")
    setTimeout(() => setAlert(null), 5000);
  };


  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar title='Github Finder' icon='fa-sharp fa-solid fa-code-branch' />
        <Routes>
          <Route path='/' element={
            <div className='container'>
              <Search searchUsers={searchUsers} clearUsers={clearUsers} showAlert={showAlert} />
              <Alert alert={alert}/>
              <Users users={users} />
            </div>
          } />
          <Route path='/about' element={<About />}></Route>
          <Route path='/user/:login' element={<User user={user} loading={loading} repos={repos} getUser={getUser} getUserRepos={getUserRepos} />}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;

