import React from 'react';
import axios from 'axios';



class Image extends React.Component {
    state = {
        imageUrl: "",
        imageFile: null
       
      }


      handleFileInput = (event) => {
        console.log('file changed')
        this.setState({
          imageFile: event.target.files,
        //   loaded: 0
        })
      }
    
      handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = new FormData()
        data.append('image', this.state.imageFile)
        

        try {
          const res = await axios.post('http://localhost:3001/upload', data)
          console.log(res.data)
          this.setState({
            imageUrl: res.data.imageUrl,
            imageFile: event.target.files,
            loaded: 0,
          })
        } catch (err) {
          console.error(err)
        }
      }

      render() {
        return (
          <div className="App">
            <form onSubmit={this.handleSubmit}>
                <p>Upload image</p>
                <input type="file" multiple onChange={this.handleFileInput} />
                <input type="submit" value="Upload" />
            </form>
            {/* <form onSubmit={this.handleTags}>
                <p>Tag:</p>
                <input type="text"/>
                <input type="submit"/>
            </form> */}
            <img src={this.state.imageUrl} alt='random' />
          </div>
        );
      }
    }


export default Image;
