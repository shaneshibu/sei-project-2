import React from 'react'
import axios from 'axios'

const apiKey = process.env.TMDB_API_KEY

class MoviesShow extends React.Component {
  constructor() {
    super()

    this.state = {}

  }

  componentDidMount() {
    // console.log('did mount')
    const movieId = this.props.match.params.id
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
      .then(res => {
        this.setState({ movie: res.data})
      })
      .catch(err => console.log(err))

  }

  componentDidUpdate() {
    // console.log(this.state.movie)
    // const titleCard = document.getElementById('hero')
    //
    // const posterPath = `https://image.tmdb.org/t/p/w500/${this.state.movie.backdrop_path}`
    // titleCard.style.background = `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${posterPath})`
    // titleCard.style.backgroundSize = 'contain'
    // titleCard.style.backgroundRepeat = 'no-repeat'
  }

  render() {
    // console.log('did render')
    if (!this.state.movie) return null
    const movie = {...this.state.movie}
    return(
      <section >



        <div className="hero is-primary is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <div id="titleCard" className="columns">
                <div className="column is-one-quarter">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                    className="image"
                  />
                </div>
                <div className="column is-three-quarters">
                  <h1 className="title">
                    {movie.title}
                    <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>
                      <span className="icon has-text-warning">
                        <i className="fab fa-imdb"></i>
                      </span>
                    </a>
                    
                  </h1>
                  <h2 className="subtitle">{movie.tagline}</h2>
                  <hr/>
                  <h4 className="subtitle is-size-4 has-text-weight-bold">Overview</h4>
                  <p>{movie.overview}</p>
                  <hr />
                  <h4 className="is-size-4 has-text-weight-bold">Release Date: {movie.release_date}</h4>
                  <hr />
                  <h4 className="subtitle">Genres</h4>
                  <p className="level">{movie.genres.map(genre => (
                    <span
                      className="level-left"
                      key={genre.id}
                    >{genre.name}</span>
                  ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>




        <hr/>
      </section>
    )
  }
}

export default MoviesShow
