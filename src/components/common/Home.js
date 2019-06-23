import React from 'react'
import axios from 'axios'

//import MoviesSearchResults from '../movies/MoviesSearchResults'

const apiKey = process.env.TMDB_API_KEY

class Home extends React.Component {
  constructor(){
    super()

    this.state = { searchString: '', query: '', radio: 'movies' }

    this.selectRadio = this.selectRadio.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clickMovieOrTv = this.clickMovieOrTv.bind(this)
    this.searchMoviesOrTv = this.searchMoviesOrTv.bind(this)
  }

  selectRadio(e) {
    this.setState({ radio: e.target.id })
  }

  handleChange({ target: { value }}) {
    const searchString = value
    this.setState({ searchString, query: searchString.replace(/ /g, '+') }, () => {
      if (this.state.searchString.trim().length!==0) {
        this.searchMoviesOrTv()
      } else {
        this.setState({ searchString: '', query: '', radio: 'movies' })
      }
    })

  }

  handleSubmit(e) {
    e.preventDefault()
    // console.log(e.target)
    //const query = this.state.searchString.replace(/ /g, '+')
    // if (this.state.radio==='TV') {
    //   this.props.history.push(`search/tv/${query}`)
    // } else {
    //   this.props.history.push(`search/movies/${query}`)
    // }

  }

  clickMovieOrTv(e){
    const id =  e.target.dataset.id
    //console.log(e.target.dataset)
    this.props.history.push(`/movies/${id}`)
  }

  searchMoviesOrTv() {
    // const query = this.props.match.params.query
    const query = this.state.query
    //console.log(query)
    let overview = null
    if (query.trim().length!==0) {
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
  }

  componentDidUpdate() {

  }

  render() {
    //console.log(this.state.searchString, this.state.query)
    return(
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="input"
              onChange={this.handleChange}
              value={this.state.searchString}
              placeholder="Pick a film"
            />
            <div className="control">
              <label className="radio">
                <input type="radio" id="tv" onClick={this.selectRadio}/>
                TV
              </label>
              <label className="radio">
                <input type="radio" id="movies" onClick={this.selectRadio}/>
                Movies
              </label>
            </div>
          </form>

          <section className="section">
            <div className="container">
              {/* <h1 className="title">Results</h1> */}
              <div>
                <div id="results" className="columns is-multiline is-mobile">
                  {this.state.movies && this.state.query && this.state.movies.map(movie => (

                    <div  className="columns column is-one-third-widescreen is-half-desktop is-half-tablet is-full-mobile"  key={movie.id} data-id={movie.id} onClick={this.clickMovieOrTv}>
                      <div className="result columns is-mobile">
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

        </div>
      </section>
    )
  }
}

export default Home
