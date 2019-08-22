import React from 'react'
import axios from 'axios'

import MoviesHero from './MoviesHero'
import MoviesCast from './MoviesCast'
import MoviesReviews from './MoviesReviews'
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
        const recommendations = recommendationsRes.data.results.map(r => {
          return {...r, release_date: this.formatDate(r.release_date)}
        })
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
    let position = this.state.backgroundPosition
    if (!this.state.media.backdrops.length) return
    const backgrounds = this.state.media.backdrops.slice()
    if (position+1 === backgrounds.length) position = 0
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
    const mediaContent = document.getElementById('media-content')
    mediaContent.scrollTo(0,0)
    this.setState({currentMedia: id})
  }

  handleClick(e) {
    const id =  e.target.dataset.id
    this.props.history.push(`/movies/${id}`)
  }

  render() {
    // console.log(this.state)
    return(

      <section>

        <div ref={el => this.hero = el} className="hero is-dark is-fullheight-with-navbar is-paddingless">
          {!this.state.heroLoaded && <img className="spinner" src="../../assets/712.gif" />}
          {this.state.heroLoaded &&
            <MoviesHero movie={this.state.movie}/>}
        </div>
        <hr />
        <div className="content">

          {!this.state.contentLoaded && <img className="spinner" src="../../assets/712.gif" />}
          {this.state.contentLoaded &&
            <MoviesCast
              cast={this.state.cast.cast}
            />}

          {this.state.contentLoaded &&
            <MoviesReviews
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
