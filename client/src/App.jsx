import React from 'react';
import NavBar from './components/NavBar.jsx';
import UrlBar from './components/UrlBar.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 'default',
    };
    this.chooseActiveTab = this.chooseActiveTab.bind(this);
  }

  componentDidMount(){}

  chooseActiveTab(tab){
    const tabFunc = () => {
      this.setState({activeTab:tab});
    }
    return tabFunc;
  }

  render(){
    return(
      <div id="appBody">
        <NavBar />
        <UrlBar />
      </div>
    )
  }
}

export default App;
