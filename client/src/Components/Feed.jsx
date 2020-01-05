import React, { Component} from 'react';
// import axios from 'axios';
import '../App.css';

class Feed extends Component {
    state = {
        hey: "hi"
    }
    render () {
        const { hey } = this.state
        return (
            <div className = "feed">
                <div className = "header">
                    <h1> BUNKR </h1>
                </div>
                <div className="container">
                    <h1>{ hey } </h1>
                </div>
            </div>
        )
    }
}
export default Feed;