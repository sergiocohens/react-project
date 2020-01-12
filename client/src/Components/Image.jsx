import React from 'react';
import axios from 'axios';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'



class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        imageUrl: "",
        imageFile: null, 
        loggedUser: 1
      }
    }

//     async componentDidMount() {
//       let response = await axios.get(`http://localhost:3001/users/${this.state.loggedUser}` )
//       this.setState({
//         imageUrl: response.data.body[0].img_url
//       })
// }


      handleFileInput = (event) => {
        this.setState({
          imageFile: event.target.files[0],
        //   loaded: 0
        })
      }
    
      handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData()
       //for(var x = 0; x<this.state.imageFile.length; x++){
        data.append('image', this.state.imageFile)
       

        try {
          const res = await axios.post('http://localhost:3001/upload', data)
          axios.put(`http://localhost:3001/images/post`, {img_src: res.data.imageUrl, users_id: this.state.loggedUser})
          this.setState({
            imageUrl: res.data.imageUrl,
            //imageFile: event.target.files,
            loaded: 0,
          })
        } catch (err) {
          console.error(err)
        }
      }

      render() {

        const { loggedUser } = this.state
        
        return (
          <div className="App">
            <form onSubmit={this.handleSubmit}>
                <p>Upload image</p>
                <input type="file" onChange={this.handleFileInput} />
                <input type="submit" value="Upload" />
            </form>
            {/* <form onSubmit={this.handleTags}>
                <p>Tag:</p>
                <input type="text"/>
                <input type="submit"/>
            </form> */}
            <img src={this.state.imageUrl} alt="" className='images' />
          </div>
        );
      }
    }


export default Image;
