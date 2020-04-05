import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  render() {
    const { books, onUpdate } = this.props

    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read'],
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(shelves).map((shelf, id) => (
              <BookShelf
                key={id}
                shelfTitle={shelves[shelf][0]}
                books={books.filter((book) => book.shelf === shelves[shelf][1])}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="open-search-link" />
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default ListBooks
