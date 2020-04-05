import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../services/BooksAPI'

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.booksOnShelf = []
    this.state = {
      books: 0,
      searchString: '',
    }

    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.booksOnShelf = books
    })
  }

  findBooks = (query) => {
    if (query === '') {
      this.setState({ books: [] })
      return
    }
    BooksAPI.search(query)
      .then((books) => {
        const booksWithShelf = books.map((bookResult) => {
          this.booksOnShelf.forEach((book) => {
            if (book.id === bookResult.id) {
              bookResult.shelf = book.shelf
            }
          })
          return bookResult
        })
        return booksWithShelf
      })
      .then((books) => {
        this.setState({ books })
        console.log(books)
      })
  }

  updateSearch(query) {
    this.setState({
      searchString: query,
    })
    this.findBooks(query)
  }

  onUpdate = () => {
    this.props.onBookChange()
    const goBackConfirmation = window.confirm(
      'Book was successfully tagged. Do you want to return to the main page?'
    )
    if (goBackConfirmation) {
      this.props.history.push('/')
    }
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
                    <Book book={book} onUpdate={this.onUpdate} />
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
