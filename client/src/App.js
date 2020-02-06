import React from 'react';
import axios from 'axios'
import Profile from './Components/Profile'
import Feed from './Components/Feed'
import LogOut from './Components/LogOut'
import './App.css';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      user: null,
      userLoggedIn: false,
      id: null
    }
  }

  setUser = (user) => {
    this.setState({
      username: user.username,
      user: user,
      userLoggedIn: true,
      id: user.id,
    })
  }

  checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get('http:localhost/auth/isUserLoggedIn')
      if (data.payload) {
        this.setUser(data.payload)
      } else {
        return
      }
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  componentDidMount() {
    this.checkUserLoggedIn()
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  handleUsernameInput = async (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordInput = async (event) => {
    this.setState({
      password_digest: event.target.value
    })
  }

  handleLogin = async () => {
    let logInUserUrl = 'http://localhost:3001/auth/login'
    try {
      const responseData = await axios.post(logInUserUrl, { username: this.state.username, password: this.state.password })
      console.log(responseData)
      this.setUser(responseData)
    } catch (error) {
      console.log("Error", error)
    }
  }

  handleRegister = async () => {
    let addNewUserUrl = "http://localhost:3001/auth/signup/"
    try {
      const responseData = await axios.post(addNewUserUrl, { username: this.state.username, password: this.state.password })
      this.setUser(responseData.data.payload)
    } catch (error) {
      console.log("Error", error)
    }
  }

  render() {
    const { id, userLoggedIn } = this.state
    if (this.state.userLoggedIn) {
      return (
        <div className="App">
          <nav>
            <Link to={`"/profile/${id}`}></Link>{" "}
            <Link to={`"/feed/${id}`}></Link>{" "}
            <Link to={'/logout/'}></Link>{" "}
          </nav>
          <Switch>
            <Route path="/feed/:id" render={(routeProps) => <Feed email={this.state.username} id={id} />} />
            <Route path="/profile/:id" render={(routeProps) => <Profile email={this.state.username} id={id} />} />
            <Route path="/logout" component={LogOut}/>
          </Switch>
          <Redirect to={`/feed/${id}`} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <div className="AppStage">
            <h1>BunkR</h1>
              <form className="login-form" onSubmit={this.handleSubmit}>
                <p>Username: </p>
                <input className="loginInput" onChange={this.handleUsernameInput} type="text" />
                <p>Password: </p>
                <input classname="loginInput" onChange={this.handlePasswordInput} type="text" />
                <button className="loginLogin" onClick={this.handleLogin}>Login</button>
                <button className="loginRegister" onClick={this.handleRegister}>Register</button>
              </form>
          </div>
        </div>
      )
    }
  }
}

export default App
