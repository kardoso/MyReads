import React from 'react'
import * as BooksAPI from './services/BooksAPI'

import SearchBooks from './Components/SearchBooks'
import ListBooks from './Components/ListBooks'

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
          <ListBooks
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
