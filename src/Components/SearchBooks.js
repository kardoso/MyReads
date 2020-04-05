import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../services/BooksAPI'

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.books = this.props.books
    this.state = {
      searchString: '',
    }

    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.books = books
    })
  }

  updateSearch(e) {
    this.setState({
      searchString: e.target.value,
    })
  }

  render() {
    const books = this.books.filter(
      (book) =>
        book.title
          .toLowerCase()
          .includes(this.state.searchString.toLowerCase()) ||
        book.authors
          .map((author) => {
            return author
          })
          .join('')
          .toLowerCase()
          .includes(this.state.searchString.toLowerCase())
    )

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {books.length > 0 ? (
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Book book={book} onUpdate={this.props.onUpdate} />
                </li>
              ))}
            </ol>
          ) : (
            <div className="books-grid">
              <p>No books found for this search</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default SearchBooks
