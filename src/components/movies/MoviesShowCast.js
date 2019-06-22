import React from 'react'

const MoviesShowCast = ({ cast }) => {
  return(

    <div className="container">
      <h4 className="subtitle">Cast</h4>
      <div className="cast-master columns">
        {cast.map(actor => (
          <div className="cast-member column is-one-fifth" key={actor.id} >
            <img src={!actor.profile_path ? 'https://www.placecage.com/200/300' : `https://image.tmdb.org/t/p/w500/${actor.profile_path}`}/>
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoviesShowCast
