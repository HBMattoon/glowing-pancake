import React from 'react';

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
            return <img src={image}></img>
          })}
        </div>
      </div>
    )
  }
}

export default ImageDisplay;