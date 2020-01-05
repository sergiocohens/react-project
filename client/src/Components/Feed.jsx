import React, { Component} from 'react';
import axios from 'axios';
import '../App.css';

class Feed extends Component {
    state = {
        hashtag: ""
    }
    handleInputChange = (e) => {
        this.setState({
            hashtag: e.target.value
        })
    }
    getImagesByTags = async (e) => {
        e.preventDefault();
        const { hashtag } = this.state
        let url = `http://localhost:3001/tags/${hashtag}`
        try {
            let imageByTag = await axios.get(url).then(res => {return res.data})
        }
        catch(err) {
            res.send("Cannot do! Error:", err)
        }
    }
    render () {
        const { hashtag } = this.state;
        return (
            <div className = "feed">
                <div className = "header">
                    <h1> BUNKR </h1>
                </div>
                <div className="container">
                    <form onSubmit={this.getImagesByTags}>
                        <input type="text" placeholder="Search hashtags" onChange={this.handleInputChange}></input>
                    </form>
                </div>
            </div>
        )
    }
}
export default Feed;