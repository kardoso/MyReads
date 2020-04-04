import React from 'react'
import * as BooksAPI from './services/BooksAPI'
import { Route } from 'react-router-dom'

import SearchBooks from './Components/SearchBooks'
import ListBooks from './Components/ListBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
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
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
            />
          )}
        />
        <Route
          path="/search"
          render={() => <SearchBooks books={this.state.allBooks} />}
        />
      </div>
    )
  }
}

export default BooksApp
