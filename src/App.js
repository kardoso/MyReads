import React from 'react'
import * as BooksAPI from './services/BooksAPI'

import BookShelf from './Components/BookShelf'
import SearchBooks from './Components/SearchBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.setState(() => ({
        allBooks,
        currentlyReading: allBooks.filter(
          book => book.shelf === 'currentlyReading'
        ),
        wantToRead: allBooks.filter(book => book.shelf === 'wantToRead'),
        read: allBooks.filter(book => book.shelf === 'read')
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks books={this.state.allBooks} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  shelfTitle="Currently Reading"
                  books={this.state.currentlyReading}
                />

                <BookShelf
                  shelfTitle="Want to Read"
                  books={this.state.wantToRead}
                />
                <BookShelf shelfTitle="Read" books={this.state.read} />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
