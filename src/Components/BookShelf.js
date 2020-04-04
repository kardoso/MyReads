import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        {props.books.length === 0 ? (
          <p>There's nothing to show here</p>
        ) : (
          <ol className="books-grid">
            {props.books.map((book, id) => (
              <li key={id}>
                <Book
                  title={book.title}
                  authors={book.authors}
                  image={book.imageLinks.smallThumbnail}
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}

export default BookShelf
