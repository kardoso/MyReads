import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

function ListBooks(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            shelfTitle="Currently Reading"
            books={props.currentlyReading}
          />

          <BookShelf shelfTitle="Want to Read" books={props.wantToRead} />
          <BookShelf shelfTitle="Read" books={props.read} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="open-search-link" />
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired
}

export default ListBooks
