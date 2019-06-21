import React from 'react'

const MoviesRecommendations = ({ recommendations, handleClick }) => (
  <div className="container" id="recommendations">
    <h4 className="subtitle">Recommendations</h4>
    <div className="recommendations columns" onClick={handleClick}>
      {recommendations.map(recommendation => (
        <div data-id={recommendation.id} className="column is-one-fifth" key={recommendation.id} >

          <img data-id={recommendation.id} src={!recommendation.poster_path ? 'https://www.placecage.com/200/300' : `https://image.tmdb.org/t/p/w500/${recommendation.poster_path}`}/>
          <p data-id={recommendation.id} >{recommendation.title}</p>
          <p data-id={recommendation.id}>{recommendation.release_date}</p>


        </div>
      ))}
    </div>
  </div>

)


export default MoviesRecommendations
