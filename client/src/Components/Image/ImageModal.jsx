import React, { Component } from 'react';
import './ImageModal.css'

class ImageModal extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <p>UPLOAD IMAGE HERE</p>
                </div>
            </div>
        )
    }
}
export default ImageModal;