import React from 'react'

const MoviesRecommendations = ({ recommendations, handleClick }) => (
  <div className="container">
    <h4 className="subtitle has-text-weight-bold">Recommendations ({recommendations.length})</h4>
    <div className="recommendations columns is-mobile">
      {recommendations.map(recommendation => (
        <div
          data-id={recommendation.id}
          className="column is-one-third-mobile is-one-quarter-tablet is-one-fifth-desktop is-2-widescreen"
          key={recommendation.id}
        >
          <img
            data-id={recommendation.id}
            src={recommendation.poster_path ? `https://image.tmdb.org/t/p/w500/${recommendation.poster_path}` : 'https://www.placecage.com/200/300'}
            onClick={handleClick}
          />
          <p data-id={recommendation.id} >{recommendation.title}</p>
          <p data-id={recommendation.id}>{recommendation.release_date}</p>


        </div>
      ))}
    </div>
    <hr />
  </div>

)


export default MoviesRecommendations
