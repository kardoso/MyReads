import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  render() {
    const { books, onUpdate } = this.props
    const currentlyReading = books.filter(
      currently => currently.shelf === 'currentlyReading'
    )
    const wantToRead = books.filter(want => want.shelf === 'wantToRead')
    const read = books.filter(read => read.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelfTitle="Currently Reading"
              books={currentlyReading}
              onUpdate={onUpdate}
            />

            <BookShelf
              shelfTitle="Want to Read"
              books={wantToRead}
              onUpdate={onUpdate}
            />
            <BookShelf shelfTitle="Read" books={read} onUpdate={onUpdate} />
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
  onUpdate: PropTypes.func.isRequired
}

export default ListBooks
