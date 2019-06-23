import React from 'react'

const MoviesHero = ({ movie }) => (
  <div className="hero-body">
    <div className="container">
      <div id="titleCard" className="columns">
        <div className="column is-one-quarter">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.name} poster`}
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
          <h4 className="subtitle has-text-weight-bold">Overview</h4>
          <p>{movie.overview}</p>
          <hr />
          <h5 className="subtitle has-text-weight-bold">Release Date: {movie.release_date}</h5>
          <hr />
          <h4 className="subtitle has-text-weight-bold">Genres</h4>
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
)

export default MoviesHero
