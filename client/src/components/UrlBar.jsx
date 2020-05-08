import React from 'react';

let apiUrl = 'http://localhost:3000/api/test'

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
    let data = {'url': url };
    data = JSON.stringify(data);
    console.log(data)
    fetch(apiUrl, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }

  submitButtonAction(){
    let inputValue = document.getElementById('urlBarInput').value;
    console.log(inputValue)
    this.setState({'url':inputValue});
    this.submitUrl(inputValue);
  }

  render(){
    return(
      <div class = "urlBar">
        <div>{`retrieving image from ${this.state.url}`}</div>
        <input id='urlBarInput'></input>

        <button onClick = {() => this.submitButtonAction()}>submit</button>

      </div>

    )
  }
}

export default UrlBar;
