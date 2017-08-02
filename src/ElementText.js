import React from 'react';
import { Component } from 'react';

class ElementText extends Component {
  render() {
    const { text, onClick, selected } = this.props;
    const selectedStyle = {
      backgroundColor: 'red',
    };
    if (selected) return <span onClick={onClick} style={selectedStyle}>{text}</span>;
    else return  <span onClick={onClick}>{text}</span>;
  }
}

export default ElementText;
