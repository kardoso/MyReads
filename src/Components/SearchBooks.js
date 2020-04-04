import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: props.books
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book, id) => (
              <li key={id}>
                <Book
                  title={book.title}
                  authors={book.authors}
                  image={book.imageLinks.smallThumbnail}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired
}

export default SearchBooks
