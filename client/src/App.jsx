import React from 'react';
import NavBar from './components/NavBar.jsx';
import UrlBar from './components/UrlBar.jsx';
import ImageDisplay from './components/ImageDisplay.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 'default',
      images: []
    };
    this.chooseActiveTab = this.chooseActiveTab.bind(this);
    this.updateImages= this.updateImages.bind(this);
  }

  componentDidMount(){}

  chooseActiveTab(tab){
    const tabFunc = () => {
      this.setState({activeTab:tab});
    }
    return tabFunc;
  }

  updateImages(data){
    //console.log(data)
    this.setState({images: data.images});
  }


  render(){
    return(
      <div id="appBody">
        <NavBar />
        <UrlBar updateImages = {this.updateImages}/>
        <ImageDisplay images = {this.state.images}/>
      </div>
    )
  }
}

export default App;
