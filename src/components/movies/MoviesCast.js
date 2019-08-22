import React from 'react'

const MoviesCast = ({ cast }) => {
  return(
    <div className="container">
      <h4 className="subtitle has-text-weight-bold">Cast ({cast.length})</h4>
      <div className="cast-master columns is-mobile">
        {cast.map(actor => (
          <div
            className="cast-member column is-one-third-mobile is-one-fifth-tablet is-2-desktop is-2-widescreen" key={actor.id} >
            <img src={!actor.profile_path ? 'https://www.placecage.com/200/300' : `https://image.tmdb.org/t/p/w500/${actor.profile_path}`}/>
            <p className="has-text-weight-semibold">{actor.name}</p>
            <p>{actor.character}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default MoviesCast
