import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../services/BooksAPI'

class Book extends Component {
  updateShelf(e, book) {
    BooksAPI.update(book, e.target.value).then((result) => {
      if (this.props.onUpdate) this.props.onUpdate()
    })
  }

  render() {
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : 'http://via.placeholder.com/128x193'
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => this.updateShelf(e, book)}
              defaultValue={
                typeof book.shelf === 'undefined' ? 'none' : book.shelf
              }
            >
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
}

export default Book
