import React, { Component } from 'react';
import axios from 'axios';
import BurgerMenu from './BurgerMenu.jsx';
import '../App.css';

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            hashtag: "",
            urls: [],
        }
        this.ref = React.createRef();
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
            let imageByTag = await axios.get(url).then((res => { return res.data.imgArr }))
            let urlArr = imageByTag.map(elem => { return elem.img_src });
            console.log(imageByTag)
            this.setState({
                urls: urlArr,
            })
        }
        catch (err) {
            console.log("Error, something went wrong. ", err)
        }
    }
    render() {
        const { urls, hashtag } = this.state;
        let images = urls.map((elem) => {
            return <img src={elem} alt={hashtag}></img>
        })
        return (
            <div className="feed">
                <div className="header">
                    <h1> BUNKR </h1>
                </div>
                <div className="container">
                    <form onSubmit={this.getImagesByTags}>
                        <input type="text" placeholder="Search hashtags" onChange={this.handleInputChange}></input>
                    </form>
                    <div className="images">
                        {images}
                    </div>
                    <div className="nav">
                    <BurgerMenu />
                </div>
                </div>
            </div>
        )
    }
}
export default Feed;