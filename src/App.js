import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import GithubState from './context/github/GithubState';

const App = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

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

  return (
    <GithubState>
      <BrowserRouter>
        <div className='App'>
          <Navbar title='Github Finder' icon='fa-sharp fa-solid fa-code-branch' />
          <Routes>
            <Route path='/' element={
              <div className='container'>
                <Search />
                <Alert />
                <Users />
              </div>
            } />
            <Route path='/about' element={<About />}></Route>
            <Route path='/user/:login' element={<User user={user} loading={loading} repos={repos} getUser={getUser} getUserRepos={getUserRepos} />}></Route>
          </Routes>

        </div>
      </BrowserRouter>
    </GithubState>
  )
}

export default App;
