import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBooks, selectBook } from '../actions/index';


class BooksList extends Component {
  constructor(props) {
    super(props);
    this.onSelectBook = this.onSelectBook.bind(this);
    this.onPressBook = this.onPressBook.bind(this);
  }

  componentDidMount() {
    this.props.fetchBooks();
  }
  render() {

    if (!this.props.books.results) {
      return <div>Loading...</div>;
    }
    return (
        <div className="">
          <h3 className="m-sm-3">Write reviews for the current top 10 of the NY Times Children&#39;s Series bestseller list</h3>
          <p className="m-sm-3">Click on one of the list items to write a review now</p>
          {this.renderBooks()}
          <img className="mb-3 ml-1 mr-1 ml-sm-3 mr-sm-3" src="http://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_200c.png" alt="New York Times Logo"/>
        </div>
    );
  }
  renderBooks() {
    return this.props.books.results.books.map( book => {
      return (
        <article
          onClick={() => this.onSelectBook(book.title)}
          onKeyUp={() => this.onPressBook(event, book.title)}
          className="row mt-3 mb-3 ml-1 mr-1 ml-sm-3 mr-sm-3 border border-danger article-special"
          key={book.primary_isbn13}
          tabindex="0"
        >
          <div className="col-sm-9 p-2">
            <h5>Title: {book.title}</h5>
            <p>Rank: {book.rank} (last week: {book.rank_last_week})</p>
            <p>Author: {book.author}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Description: {book.description}</p>
          </div>
          <div className="col-sm-3 p-2 text-center">
            <img src={book.book_image} className="img-fluid" alt="a cover of a book" />
          </div>
        </article>
      );
    });
  }

  onSelectBook(book) {
    this.props.selectBook(book);
    console.log(book);
    this.props.history.push("/review/new");
  }

  onPressBook(event, book) {

    if (event.key == 'Enter') {
      console.log('key: ', event.key);
      console.log('book: ', book);
      this.props.selectBook(book);
      this.props.history.push("/review/new");
    }
  }

}

function mapStateToProps(state) {
  return { books: state.books };
}

export default connect(mapStateToProps, { fetchBooks, selectBook })(BooksList);