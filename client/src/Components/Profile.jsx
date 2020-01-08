import React from 'react'
import axios from 'axios'

class Profile extends React.Component {
 constructor() {
   super()
   this.state = {
     loggedUser: 'serg@gmail.com',
     loggedId:'2',
     imgUrl: '',
     imgFile: null
   }
 }

 async componentDidMount() {
   let response = await axios.get(`http://localhost:3001/users/profilepic/${this.state.loggedId}`)
   this.setState({
     imgUrl: response.data.body[0].img_url
   })
 }

 handleFileInput = (event) => {
   this.setState({
     imgFile: event.target.files[0]
   })
 }

 handleSubmit = async (e) => {
   e.preventDefault();
   const data = new FormData()
   data.append('image', this.state.imgFile)
   try {
     const res = await axios.post('http://localhost:3001/upload', data)
     axios.put(`http://localhost:3001/users/profilepic/${this.state.loggedId}`, {imgUrl: res.data.imageUrl})
     this.setState({
       imgUrl: res.data.imageUrl
     })
   } catch (err) {
     console.error(err)
   }
 }

 render(){
    return (
        <div className="App">
            <h1>Profile</h1>
            <img src={this.state.imgUrl} alt=''></img>
            <p>Welcome {this.state.loggedUser}!</p>
            <form onSubmit={this.handleSubmit}>
              <input type="file" onChange={this.handleFileInput} />
              <input type="submit" value="Change Pic" />
            </form>
        </div>
      );
 }
}

export default Profile;
