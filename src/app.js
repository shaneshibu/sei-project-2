import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'

import NavBar from './components/common/NavBar'
import Home from './components/common/Home'
import MoviesSearchResults from './components/movies/MoviesSearchResults'
import MoviesShow from './components/movies/MoviesShow'

class App extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render(){
    //console.log()
    return(
      <BrowserRouter>
        <main>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/search/:query" component={MoviesSearchResults}/>
            <Route path="/movies/:id" component={MoviesShow}/>
          </Switch>
        </main>
      </BrowserRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
