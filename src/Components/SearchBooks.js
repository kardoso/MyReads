import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../services/BooksAPI'

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: 0,
      searchString: '',
    }

    this.updateSearch = this.updateSearch.bind(this)
  }

  findBooks = (query) => {
    if (query === '') {
      this.setState({ books: [] })
      return
    }
    BooksAPI.search(query).then((books) => {
      this.setState({ books })
    })
  }

  updateSearch(query) {
    this.setState({
      searchString: query,
    })
    this.findBooks(query)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.updateSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books ? (
            this.state.books.length > 0 ? (
              <ol className="books-grid">
                {this.state.books.map((book) => (
                  <li key={book.id}>
                    <Book book={book} />
                  </li>
                ))}
              </ol>
            ) : (
              <div className="books-grid">
                <p>No books found for this search</p>
              </div>
            )
          ) : (
            <div className="books-grid">
              <p>Enter your search in the field above</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
