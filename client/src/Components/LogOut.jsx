import React from 'react'
import App from '../App'
import axios from 'axios'

class LogOut extends React.Component {
  constructor(){
    super()
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
