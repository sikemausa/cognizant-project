import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ElementText from './ElementText';

class App extends Component {
  constructor(){
    super();
    this.state = {
      selectedTag: null,
      inputValue: '',
      sourceContent: '',
    }
  }

  noHttpInUrl(url){
    url.split('').splice(0,4).join('') !== 'http';
  }

  getPageSource(){
    if (this.noHttpInUrl) this.state.inputValue = `http://${this.state.inputValue}`;
    axios.post('/url', {
      params: {
        inputValue: this.state.inputValue,
      },
    }).then(res => {
      this.setState({sourceContent: this.extractHtmlTags(res.data)});
    });
}

extractHtmlTags(source){
  var html = source;
  var arr = html.split(/></g);

  for(var i = 0; i < arr.length; i++){
    if(arr[i].substring(0, 1) != '<'){
      arr[i] = '<' + arr[i];
    }
    if(arr[i].slice(-1) != '>'){
      arr[i] = arr[i] + '>';
    }
  }
  return arr;
}

handleSubmit(e) {
  e.preventDefault();
  this.getPageSource();
}

handleElementClick(element) {
  const nodeType = this.getNodeType(element);
  this.setState({ selectedTag: nodeType });
}

getNodeType(element) {
  const temp = document.createElement('div');
  temp.innerHTML = element;
  if (temp.firstChild) return temp.firstChild.nodeName;
  else return null;
}

  render() {
    let websiteSource;
    if(this.state.sourceContent) {
      websiteSource = this.state.sourceContent.map((element, index) => {
        console.log(element);
        let selected = false;
        if (this.getNodeType(element) === this.state.selectedTag) selected = true;
        return (
          <ElementText
            key={index}
            text={element}
            selected={selected}
            onClick={() => this.handleElementClick(element)}
          />
        )
      });
    } else {
      websiteSource = null;
    }
    return (
      <div className="App">
        <input
          id="url-input"
          type="text"
          value={this.state.inputValue}
          onChange={e => this.setState({ inputValue: e.target.value })} />
        <button id="submit" onClick={e => this.handleSubmit(e)}>Submit</button>
        <div id="content">
          { websiteSource }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
