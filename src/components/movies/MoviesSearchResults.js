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
    const id =  e.target.dataset.id
    //console.log(e.target.dataset)
    this.props.history.push(`/movies/${id}`)
  }

  searchMovies() {
    const query = this.props.match.params.query
    //console.log(query)
    let overview = null
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
      .then(res => {

        res.data.results.map(movie => {
          if (movie.overview.length > 150 ) {
            overview = movie.overview.slice(0, 150) + '...'
            movie.overview = overview
          }
        })

        this.setState({ movies: res.data.results })
      })
      .catch(err => console.log(err))
  }

  searchTv() {
    const query = this.props.match.params.query
    let overview = null

    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`)
      .then(res => this.setState({ tvShows: res.data.results }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    console.log(this.props.location.pathname.split('/').includes('movies'))
    if(this.props.location.pathname.split('/').includes('movies')) {
      this.searchMovies()
    } else if (this.props.location.pathname.split('/').includes('tv')){
      this.searchTv()
    }

  }

  render() {
    //console.log(this.state)
    if (!this.state.movies) return null
    return(
      <section className="section">
        <div className="container">
          <h1 className="title">Results</h1>
          <div>
            <div id="results" className="columns is-multiline is-mobile">
              {this.state.movies.map(movie => (

                <div  className="columns column is-one-third-desktop is-half-tablet is-full-mobile"  key={movie.id} data-id={movie.id} onClick={this.handleClick}>
                  <div id="result" className="columns is-mobile">
                    <div className="column is-one-quarter" data-id={movie.id}>
                      <img src={!movie.poster_path ? 'https://www.placecage.com/200/300' : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="image" data-id={movie.id}/>
                    </div>
                    <div className="column is-three-quarters" data-id={movie.id}>
                      <h4 data-id={movie.id}>
                        {movie.title}
                      </h4>
                      <p className="subtitle">{movie.release_date}</p>
                      <p className="overview" data-id={movie.id}>{movie.overview}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default MoviesSearchResults
