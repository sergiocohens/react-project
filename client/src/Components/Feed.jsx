import React, { Component } from 'react';
import axios from 'axios';
import BurgerMenu from './Menu/BurgerMenu.jsx';
import FeedCards from './Feed/FeedCards.jsx'
import ImageButton from './Image/ImageButton.jsx'
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
    componentDidMount() {
        this.getAllImages();
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
            this.setState({
                urls: urlArr,
            })
        }
        catch (err) {
            console.log("Error, something went wrong. ", err)
        }
    }
    getAllImages = async () => {
        let url = `http://localhost:3001/images/all`;
        try {
            let allImages = await axios.get(url).then((res) => { return res.data.payload })
            let allImagesUrls = allImages.map((elem) => {
                return elem.img_src;
            })
            this.setState({
                urls: allImagesUrls
            })
        }
        catch (err) {
            console.log("error:", err)
        }
    }
    render() {
        const { urls, hashtag } = this.state;
        return (
            <div className="feed">
                <BurgerMenu />
                <div className="header">
                    <h1> BUNKR </h1>
                </div>
                <div className="button">
                    <ImageButton />
                </div>
                <div className="container">
                    <form onSubmit={this.getImagesByTags}>
                        <input type="text" placeholder="Search hashtags" onChange={this.handleInputChange} />
                    </form>
                    <div className="images">
                        <FeedCards urls={urls} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Feed;