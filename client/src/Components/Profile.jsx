import React from 'react';
import axios from 'axios'

class Profile extends React.Component {
 constructor() {
   super()
   this.state = {
     loggedUser: 'serg@gmail.com',
     loggedId:'2',
     imgUrl: ''
   }
 }

 async componentDidMount() {
   let response = await axios.get(`http://localhost:3001/users/${this.state.loggedId}`)
   this.setState({
     imgUrl: response.data.body[0].img_url
   })
 }

 render(){
    return (
        <div className="App">
            <h1>Profile</h1>
            <img src={this.state.imgUrl} alt=''></img>
            <p>Welcome {this.state.loggedUser}!</p>
        </div>
      );
 }
}

export default Profile;
