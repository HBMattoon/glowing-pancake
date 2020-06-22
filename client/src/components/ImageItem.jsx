import React from 'react';

class ImageItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  ComponentWillMount(){

  }

  render(){
    return(
      <div class="image-item-zone">
        <div class="image-item">
          <img class="myImage" src={this.props.uri}></img>
        </div>
        <div class="options">
          options here!
        </div>
      </div>
    )
  }
}

export default ImageItem;
