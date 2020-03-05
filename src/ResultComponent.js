import React, { Component } from 'react';

class ResultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
    console.log(this.id)
    return (                 
      <div 
         id={this.id}>
        <li>{this.props.result.volumeInfo.title}</li>
        <label>Would you like a page count?</label>
        <input type="checkbox" onChange={(e) => this.setState({moreInfo: !this.state.moreInfo})} /> 
        {this.state.moreInfo ? (<div>{this.props.result.volumeInfo.pageCount} pages </div>) : (<div></div>) }
      </div>)
  }
}

export default ResultComponent;