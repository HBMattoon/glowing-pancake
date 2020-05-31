import React from 'react';

let apiUrl = 'http://localhost:3000/api/image'

class UrlBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'url':'undefined',
    }
  }


  componentDidMount(){
    console.log('test cdm');
  }

  submitUrl(url) {
    const data = {'url': url };
    const jsonData = JSON.stringify(data);
    //console.log(jsonData)
    fetch(apiUrl, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(res => res.json())
    .then(res => {
      if(res.status === 201){
        this.getUrls();
      } else {
        console.log(res.status)
      }
    })
    .catch(err => console.log(err))
  }

  getUrls() {
    console.log('getting objects!')
    fetch(apiUrl)
    .then(res => res.json())
    .then(res => {
      this.props.updateImages(res)
    })
    .catch(err =>  console.log(err))
  }

  submitButtonAction(){
    let inputValue = document.getElementById('urlBarInput').value;
    //console.log(inputValue)
    this.setState({'url':inputValue});
    this.submitUrl(inputValue);
  }



  render(){
    return(
      <div class = "urlBar">
        <div>{`retrieving image from ${this.state.url}`}</div>
        <input id='urlBarInput'></input>

        <button onClick = {() => this.submitButtonAction()}>submit</button>
        <button onClick = {() => this.getUrls()}>Update images</button>
      </div>

    )
  }
}

export default UrlBar;
