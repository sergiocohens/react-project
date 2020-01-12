import React from 'react';
import axios from 'axios';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'



class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        imageUrl: "",
        imageFile: null, 
        loggedUser: 1,
        tagIds:[],
        tagStr:"",
        tagList:""
      }
    }

      addTag = async () => {
        let {tagStr} = this.state;
        let tagId =   await axios.get(`http://localhost:3001/tags/tag/${tagStr}`) 
        // if (!tagId.data.tagId.id) {
        //   axios.post(`http://localhost:3001/`)
        //   // function to post tag in tags table and then store tag id (tagIds) and tagname (tagList) in state
        // } else {
        //   // function to store tag id (tagIds) and tagname (tagList) in state
        // }

      }

      handleFileInput = (event) => {
        this.setState({
          imageFile: event.target.files[0],
        //   loaded: 0
        })
      }

      handleTagsInput = (event) => {    
        this.setState ({
          tagStr: event.target.value
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
          // post tags to the imagestags table with tag_id (from this.state.tagIds) and img_id (from response from updated images table)
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

        const { loggedUser, tagList} = this.state
        
        return (
          <div className="App">
            <form onSubmit={this.handleSubmit}>
                <p>Upload image</p>
                <input type="file" onChange={this.handleFileInput} placeholder="Write tags with hashtags" />                
                <br></br>
                <p>Add Tags</p><input type="text" onChange={this.handleTagsInput}/>
                <button onClick={this.addTag}>Add</button> <p>Tags:{tagList}</p>
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
