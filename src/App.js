import React, { Component } from 'react';
import './App.css';
import ResultComponent from './ResultComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: '',
      data: this.data,
      loading: true,
      freeFilter: false,
      moreInfo: false
    }
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    const apiKey = 'AIzaSyBg4-tUB_ld35nLgKyuyjjPKzk7mISAzLo';
    let freeBooksOnly = '';

    if (this.state.freeFilter) {
      freeBooksOnly = '&filter=free-ebooks';
      }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.bookTitle}+inauthor:keyes&key=${apiKey}${freeBooksOnly}&maxResults=5`)
      .then(res => res.json())
      .then(res => {this.setState({data: res, loading: false}); console.log(this.state.data.items) })

  }
  
  changeHandler = (e) => {
    this.setState({bookTitle: e.target.value})
  }

  render() {
    return (
      <div>
        <h1>google book api</h1>
        <form className="bookTitle" onSubmit={this.submitHandler}>
          <label htmlFor= "title">Please enter a book title</label>
          <input 
            type='text'
            name='title'
            id='title-grabber' 
            onChange={this.changeHandler}
          />
        </form>
        <div>
          {this.state.loading || !this.state.data ? (
            <div></div>
          ) : (
            <div>
              <ul>
                {this.state.data.items.map((el, id) => {
                  return  <ResultComponent result={el} id={id} />
                  // return (                 
                  //   <div key={el.id}>
                  //   <li>{el.volumeInfo.title}</li>
                  //   <label>Would you like a page count?</label>
                  //   <input type="checkbox" onChange={(e) => this.setState({moreInfo: !this.state.moreInfo})} /> 
                  //   {this.state.moreInfo ? (<div>{el.volumeInfo.pageCount} pages </div>) : (<div></div>) }
                  //   </div> )
                })
                }
              </ul>
            </div> 
          )}
        </div>
        <label>Would you like to see only free books?</label>
        <input type="checkbox" onChange={(e) => this.setState({freeFilter: !this.state.freeFilter})} />
      </div>
    )
  }
}

export default App;
// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
// make title taken from submit button cause fetch

// https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=yourAPIKey