import React from 'react'

const MoviesRecommendations = ({ recommendations }) => (
  <div className="container" id="recommendations">
    <h4 className="subtitle">Recommendations</h4>
    <div className="recommendations columns">
      {recommendations.map(recommendation => (
        <div className="cast-member column is-one-fifth" key={recommendation.id} >
          <img src={!recommendation.poster_path ? 'https://www.placecage.com/200/300' : `https://image.tmdb.org/t/p/w500/${recommendation.poster_path}`}/>
          <p>{recommendation.title}</p>
          <p>{recommendation.release_date}</p>
        </div>
      ))}
    </div>
  </div>

)


export default MoviesRecommendations
