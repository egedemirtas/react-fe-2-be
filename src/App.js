import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';

class App extends React.Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await response.json();
    this.setState({ users: data, loading: false })
  }

  searchUsers = async text => {
    this.setState({ loading: true });
    const response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await response.json();
    if (!data.items) {
      return;
    }
    this.setState({ users: data.items, loading: false })
  }

  getUser = async (username) => {
    this.setState({ loading: true });
    const response = await fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await response.json();
    if (!data) {
      return;
    }
    this.setState({ user: data, loading: false })
  }

  clearUsers = async text => {
    this.setState({ users: [], loading: false })
  }

  setAlert = (alertText) => {
    this.setState({ alert: alertText, loading: false })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar title='Github Finder' icon='fa-sharp fa-solid fa-code-branch' />
          <Routes>
            <Route path='/' element={
              <div className='container'>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} setAlert={this.setAlert} />
                <Alert alert={this.state.alert} />
                <Users loading={this.state.loading} users={this.state.users} />
              </div>
            } />
            <Route path='/about' element={<About/>}></Route>
            <Route path='/user/:login' element={<User user={this.state.user} loading={this.state.loading} getUser={this.getUser}/>}></Route>
          </Routes>

        </div>
      </BrowserRouter>
    )
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
