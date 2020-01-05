import React from 'react';


class Image extends React.Component {
 render(){
    return (
        <div className="App">
        
            <p>Image Upload</p>
            <form>
                <input type="file"/>
                <input type="submit" value="Upload"/>
            </form>

        </div>
      );
 }
}


export default Image;
