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
    this.state = {
      reviews: { results: [] },
      heroLoaded: false,
      contentLoaded: false,
      videosLoaded: false
    }

    this.getMovie = this.getMovie.bind(this)
    this.getReviews = this.getReviews.bind(this)
    this.getCredits = this.getCredits.bind(this)
    this.getImages = this.getImages.bind(this)
    this.getVideos = this.getVideos.bind(this)
    this.getRecommendations = this.getRecommendations.bind(this)
    this.moveReview = this.moveReview.bind(this)
    this.chooseMedia = this.chooseMedia.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setBackground = this.setBackground.bind(this)
    this.formatDate = this.formatDate.bind(this)

    this.backgroundImageTimerId = null
    this.time = new Date().getTime()
  }

  componentDidMount() {
    this.pageIsLoading()
    this.setState({
      previousLocation: this.props.history.location,
      heroLoaded: false,
      contentLoaded: false
    }, () => {
      const movieId = this.props.match.params.id
      this.loadPage(movieId)
    })
  }

  componentDidUpdate() {
    const newTime = new Date().getTime()
    if (newTime > this.time + 4999) {
      this.time = newTime
      this.setBackground()
    }

    if (this.state.previousLocation===this.props.history.location) return null
    this.pageIsLoading()
    this.time = new Date().getTime()
    clearTimeout(this.backgroundImageTimerId)

    this.setState({
      previousLocation: this.props.history.location,
      heroLoaded: false,
      contentLoaded: false
    }, () => {
      window.scrollTo(0,0)

      const movieId = this.props.match.params.id
      this.loadPage(movieId)
    })
  }

  loadPage(id) {
    this.loadHero(id)
    this.loadContent(id)
  }

  pageIsLoading() {
    // const preLoaderPath = '../../assets/ajax-loader.gif'
    // this.hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), url(${preLoaderPath})`
    // this.hero.style.backgroundPosition = 'center'
    // this.hero.backgroundSize = 'contain'
    this.hero.style.background = 'white'
  }

  loadHero(id) {
    axios.all([this.getMovie(id), this.getImages(id)])
      .then(axios.spread((movieRes, imagesRes) => {
        //movie
        const movie = {...movieRes.data, release_date: this.formatDate(movieRes.data.release_date)}
        //images
        const posters = imagesRes.data.posters.filter(poster => poster.iso_639_1 === 'en')
        const media = {
          posters: posters,
          backdrops: imagesRes.data.backdrops
        }
        const currentMedia = 'posters'
        const backgroundPosition = 0
        //setState
        this.setState({
          movie,
          media,
          currentMedia,
          backgroundPosition,
          heroLoaded: true
        }, this.setBackground)
      }))
      .catch(err => console.log(err))
  }

  loadContent(id) {
    axios.all([
      this.getCredits(id),
      this.getReviews(id),
      this.getVideos(id),
      this.getRecommendations(id)
    ])
      .then(axios.spread((creditsRes, reviewsRes, videosRes, recommendationsRes) => {
        //credits
        const cast = creditsRes.data
        //reviews
        const reviews = reviewsRes.data
        const reviewNumber = 0
        //videos
        const videos = videosRes.data.results
        //recommendations
        const recommendations = recommendationsRes.data.results
        //setState
        this.setState({
          cast,
          reviews,
          reviewNumber,
          media: {...this.state.media, videos },
          recommendations,
          contentLoaded: true
        })
      }))
      .catch(err => console.log(err))
  }

  getMovie(movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
  }

  getCredits(movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)
  }

  getReviews(movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en`)
  }

  getImages(movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`)
  }

  getVideos(movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en`)
  }

  getRecommendations (movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`)
  }

  setBackground() {
    //console.log(this.state)
    let position = this.state.backgroundPosition
    if (!this.state.media.backdrops.length) return
    const backgrounds = this.state.media.backdrops.slice()
    if (position+1 === backgrounds.length) position = 0
    //const el = this.hero
    //console.log(position, new Date().getSeconds())
    this.hero.style.background = `url(https://image.tmdb.org/t/p/w500/${backgrounds[position].file_path}) center no-repeat`
    this.hero.style.backgroundSize = 'cover'

    this.backgroundImageTimerId = setTimeout(() => {
      this.setState({ backgroundPosition: position+1 })
    }, 5000)

  }

  formatDate(apiDateString) {
    if (apiDateString) {
      const dateArr = apiDateString.split('-')
      return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`
    }
    return ''
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

  chooseMedia({ target: { id }}) {
    this.setState({currentMedia: id})
  }

  handleClick(e) {
    const id =  e.target.dataset.id
    //console.log(e.target.dataset)
    this.props.history.push(`/movies/${id}`)
  }

  render() {
    //console.log(this.state)
    return(

      <section>

        <div ref={el => this.hero = el} className="hero is-dark is-fullheight-with-navbar is-paddingless">
          {/* <div className="hero-tint"> */}
          {!this.state.heroLoaded && <img className="spinner" src="../../assets/712.gif" />}
          {this.state.heroLoaded &&
            <div className="hero-body">
              <div className="container">
                <div id="titleCard" className="columns">
                  <div className="column is-one-quarter">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`}
                      alt={`${this.state.movie.name} poster`}
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
                    <h4 className="subtitle has-text-weight-bold">Overview</h4>
                    <p>{this.state.movie.overview}</p>
                    <hr />
                    <h5 className="subtitle has-text-weight-bold">Release Date: {this.state.movie.release_date}</h5>
                    <hr />
                    <h4 className="subtitle has-text-weight-bold">Genres</h4>
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
          {/* </div> */}
        </div>
        <hr />
        <div className="content">

          {!this.state.contentLoaded && <img className="spinner" src="../../assets/712.gif" />}
          {this.state.contentLoaded &&
            <MoviesShowCast
              cast={this.state.cast.cast}
            />}

          {this.state.contentLoaded &&
            <MoviesShowReviews
              reviews={this.state.reviews.results}
              reviewNumber={this.state.reviewNumber}
              moveReview={this.moveReview}
            />}

          {this.state.contentLoaded &&
            <MoviesMedia
              media={this.state.media}
              chooseMedia= {this.chooseMedia}
              currentMedia={this.state.currentMedia}
              videosLoaded={this.state.videosLoaded}
            />}

          {this.state.contentLoaded &&
            <MoviesRecommendations
              recommendations={this.state.recommendations}
              handleClick={this.handleClick}
            />}
        </div>


      </section>
    )
  }
}

export default MoviesShow
