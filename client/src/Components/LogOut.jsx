import React from 'react'
import App from '../App'
import axios from 'axios'

class LogOut extends React.Component {
  constructor(){
    super()
  }

  async componentDidMount() {
    await axios.get('http://localhost:3001/auth/logout')
  }

  render() {
    return (
      <>
      <h1>GOODBYE</h1>
      <App/>
      </>
    )
  }
}

export default LogOut
