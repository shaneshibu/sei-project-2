import React from 'react'
import axios from 'axios'

const apiKey = process.env.TMDB_API_KEY

class MoviesSearchResults extends React.Component {
  constructor() {
    super()

    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const id =  e.target.className
    this.props.history.push(`/movies/${id}`)
  }

  searchMovies(  ) {
    const query = this.props.match.params.query
    //console.log(query)
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
      .then(res => {
        this.setState({ movies: res.data.results })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.searchMovies()
  }

  render() {
    console.log(this.state.movies)
    if (!this.state.movies) return null
    return(
      <section className="section">
        <div className="container">
          <h1 className="title">Results</h1>
          <div>
            {this.state.movies.map(movie => (
              <p
                key={movie.id}
                className={movie.id}
                onClick={this.handleClick}
              >
                {movie.title}
              </p>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default MoviesSearchResults
