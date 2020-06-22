import React from 'react';
import ImageItem from './ImageItem.jsx';

class ImageDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div>
        <div>images below here:</div>
        <div>
          {this.props.images.map(image => {
            return <ImageItem uri={image} />
          })}
        </div>
      </div>
    )
  }
}

export default ImageDisplay;
