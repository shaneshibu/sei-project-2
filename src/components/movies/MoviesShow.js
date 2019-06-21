import React from 'react'
import axios from 'axios'

import MoviesShowReviews from './MoviesShowReviews'
import MoviesShowCast from './MoviesShowCast'
import MoviesMedia from './MoviesMedia'
import MoviesRecommendations from './MoviesRecommendations'

const apiKey = process.env.TMDB_API_KEY

class MoviesShow extends React.Component {
  constructor() {
    super()

    this.state = {  reviews: { results: [] }  }

    this.getMovie = this.getMovie.bind(this)
    this.getReviews = this.getReviews.bind(this)
    this.getCredits = this.getCredits.bind(this)
    this.getImages = this.getImages.bind(this)
    this.getVideos = this.getVideos.bind(this)
    this.moveReview = this.moveReview.bind(this)
    this.chooseMedia = this.chooseMedia.bind(this)
    this.getRecommendations = this.getRecommendations.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setBackground = this.setBackground.bind(this)
  }

  componentDidMount() {
    this.setState({ previousLocation: this.props.history.location })
    const movieId = this.props.match.params.id
    this.getMovie(movieId)
    this.getReviews(movieId)
    this.getCredits(movieId)
    this.getImages(movieId)
    this.getVideos(movieId)
    this.getRecommendations(movieId)
  }

  componentDidUpdate() {
    if (this.state.previousLocation===this.props.history.location) return null
    this.setState({ previousLocation: this.props.history.location })
    window.scrollTo(0,0)
    const movieId = this.props.match.params.id
    this.getMovie(movieId)
    this.getReviews(movieId)
    this.getCredits(movieId)
    this.getImages(movieId)
    this.getVideos(movieId)
    this.getRecommendations(movieId)

  }

  handleClick(e) {
    const id =  e.target.dataset.id
    //console.log(e.target.dataset)
    this.props.history.push(`/movies/${id}`)
  }

  getMovie(movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
      .then(res => {
        this.setState({ movie: res.data})
      })
      .catch(err => console.log(err))
  }

  getReviews(movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`)
      .then(res => {
        this.setState({ reviews: res.data, reviewNumber: 0 })
      })
      .catch(err => console.log(err))
  }

  moveReview({ target: { id } }) {
    let reviewNumber = this.state.reviewNumber
    let changed = false
    if (id==='right') {
      if (reviewNumber+1 < this.state.reviews.results.length){
        reviewNumber++
        changed = true
      }
    }

    if (id==='left') {
      if (reviewNumber-1 > -1){
        reviewNumber--
        changed = true
      }
    }
    if (changed===true) this.setState({ reviewNumber })
  }

  getCredits(movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)
      .then(res => {
        this.setState({ cast: res.data })
      })
      .catch(err => console.log(err))
  }

  chooseMedia({ target: { id }}) {
    this.setState({currentMedia: id})
  }

  getImages(movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`)
      .then(res => {
        //console.log(res.data)
        this.setState({ media: {posters: res.data.posters, backdrops: res.data.backdrops}, currentMedia: 'posters' })
        this.setBackground()

      })
      .catch(err => console.log(err))
  }

  setBackground() {
    const backgrounds = this.state.media.backdrops.slice()
    const el = this.hero
    console.log(backgrounds)

    el.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/w500/${backgrounds[0].file_path}) no-repeat`
    el.style.backgroundSize = 'cover'

  }

  getVideos(movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
      .then(res => {
        this.setState({ media: {...this.state.media, videos: res.data.results} })
      })
      .catch(err => console.log(err))
  }

  getRecommendations (movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`)
      .then(res => this.setState({ recommendations: res.data.results}))
      .catch(err => console.log(err))

  }

  render() {

    // const movie = {
    //   ...this.state.movie,
    //   review: {...this.state.reviews.results},
    //   cast: [...this.state.cast.cast]
    // }
     //console.log(this.state)
    return(

      <section >

        <div ref={el => this.hero = el } className="hero is-primary is-fullheight-with-navbar">
          {this.state.movie &&
            <div className="hero-body">
              <div className="container">
                <div id="titleCard" className="columns">
                  <div className="column is-one-quarter">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`}
                      alt=""
                      className="image"
                    />
                  </div>
                  <div className="column is-three-quarters">
                    <h1 className="title">
                      {this.state.movie.title}
                      <a href={`https://www.imdb.com/title/${this.state.movie.imdb_id}`}>
                        <span className="icon has-text-warning">
                          <i className="fab fa-imdb"></i>
                        </span>
                      </a>

                    </h1>
                    <h2 className="subtitle">{this.state.movie.tagline}</h2>
                    <hr/>
                    <h4 className="subtitle is-size-4 has-text-weight-bold">Overview</h4>
                    <p>{this.state.movie.overview}</p>
                    <hr />
                    <h4 className="is-size-4 has-text-weight-bold">Release Date: {this.state.movie.release_date}</h4>
                    <hr />
                    <h4 className="subtitle">Genres</h4>
                    <p className="level">{this.state.movie.genres.map(genre => (
                      <span
                        className="level-left"
                        key={genre.id}
                      >{genre.name}</span>
                    ))}
                    </p>
                  </div>
                </div>
              </div>

            </div>}

        </div>
        <hr />
        {this.state.cast && <MoviesShowCast
          cast={this.state.cast.cast}
                            />}
        { this.state.reviews.results.length>0 && <MoviesShowReviews
          reviews={this.state.reviews.results}
          reviewNumber={this.state.reviewNumber}
          moveReview={this.moveReview}
                                                   />}
        <hr />
        {this.state.currentMedia && <MoviesMedia
          media={this.state.media}
          chooseMedia= {this.chooseMedia}
          currentMedia={this.state.currentMedia}
        />}
        <hr />
        {this.state.recommendations && <MoviesRecommendations
          recommendations={this.state.recommendations}
          handleClick={this.handleClick}
        />}
        <hr />

      </section>
    )
  }
}

export default MoviesShow
