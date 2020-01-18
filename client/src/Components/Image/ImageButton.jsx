import React, { Component } from 'react';
import ImageModal from './ImageModal';

class ImageButton extends Component {
    constructor() {
        super();
    }
    handleImageButton = () => {
        console.log("create popup modal");
        
    }
    render () {
        return (
            <div className  = 'image-button'>
                <button onClick={this.handleImageButton}> + </button>
                <ImageModal />
            </div>
        )
    }
}

export default ImageButton;