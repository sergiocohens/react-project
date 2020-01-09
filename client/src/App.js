import React from 'react';
import axios from 'axios'
// import Login from './Components/Login'
import Profile from './Components/Profile'
// import Image from './Components/Image'
import Feed from './Components/Feed'
import './App.css';

import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      exist: false,
      id: null,
      button: null,
      redirected: false,
      defaultPhoto: "http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png",
    }

  }


  handleSubmit = (event) => {
    event.preventDefault()
  }

  handleEmailInput = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleLogin = async () => {
    const { email, exist, id, button } = this.state
    let getAllUsers = `http://localhost:3001/users/${email}`

   
    try {

      const response = await axios.get(getAllUsers)
      let responseData = response.data.body

      if (responseData) {
        return this.setState({
          exist: true,
          id: responseData.id,
          redirected: true,
          button: "login",
        })
      }
    } catch (error) {
      console.log("Error", error)
      this.setState({
        button: "login",
      })
  
    }



  }




  handleRegister = async () => {
    const { email, exist, id, button, defaultPhoto } = this.state
    let getAllUsers = `http://localhost:3001/users/${email}`
    // this.setState({
    //   button: "register"
    // })

    try {
      const response = await axios.get(getAllUsers)
      if (response.data) {
        this.setState({
          exist: true,
        })
      }
    } catch (error) {
      console.log("Error", error)
    }
    if (exist === false) {
      let addNewUser = "http://localhost:3001/users/"
      try {
        const postNewUser = await axios.post(addNewUser, { email: email, img_url: defaultPhoto })
        const updatedUsers = await axios.get(getAllUsers)
        const updatedUsersData = updatedUsers.data.body
        this.setState({
          id: updatedUsersData.id,
          redirected: true,
          button: "register"
        })
      }
      catch (error) {
        console.log("Error", error)
        this.setState({
      button: "register"
    })
      }
    }


  }




  render() {
    const { email, exist, id, button, redirected } = this.state
  if (button === "login") {
      if (exist === true) {
        return (
          <div className="App">
            <nav>
              <Link to={`"/feed/${id}`}></Link>{" "}
              <Link to={`"/feed/${id}`} />{" "}

            </nav>
            <Switch>
            <Route path="/feed/:id" render={
              (routeProps) => {
                return (
                  <Feed email={email} id={id} />
                )
              }
            } />
            </Switch>
            <Redirect to={`/feed/${id}`} />

          </div>
        );
      } else {
        return (
          <div className="App">
            <form onSubmit={this.handleSubmit}>
              <input className="loginInput" onChange={this.handleEmailInput} type="text" />
              <button className="loginLogin" onClick={this.handleLogin}>Login</button>
              <button className="loginRegister" onClick={this.handleRegister}>Register</button>
            </form>
            <p>Email Does Not Exist. Try again.</p>
          </div>
        );
      }
    } else if (button === "register") {

      if (exist === true) {
        return (
          <div className="App">
            <form onSubmit={this.handleSubmit}>
              <input className="loginInput" onChange={this.handleEmailInput} type="text" />
              <button className="loginLogin" onClick={this.handleLogin}>Login</button>
              <button className="loginRegister" onClick={this.handleRegister}>Register</button>
            </form>
            <p>Email is Already Registered. </p>
          </div>
        );
      } else {
        return (
          <div className="App">
            <nav>
              <Link to={`"/profile/${id}`}></Link>{" "}
            </nav>

            <Switch> 
            <Route path="/profile/:id" render={
              (routeProps) => {
                return (
                  <Profile email={email} id={id} />

                )
              }
            } />
            </Switch> 
            <Redirect to={`/profile/${id}`} />
          </div>
        );
      }
    } else if (redirected === false) {
      return (
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <input className="loginInput" onChange={this.handleEmailInput} type="text" />
            <button className="loginLogin" onClick={this.handleLogin}>Login</button>
            <button className="loginRegister" onClick={this.handleRegister}>Register</button>
          </form>
        </div>
      );
    }
  }

    

  

}

export default App;
