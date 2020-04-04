import React from 'react'
import * as BooksAPI from './services/BooksAPI'
import { Route } from 'react-router-dom'

import SearchBooks from './Components/SearchBooks'
import ListBooks from './Components/ListBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={this.state.books} onUpdate={this.getBooks} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks books={this.state.books} onUpdate={this.getBooks} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
