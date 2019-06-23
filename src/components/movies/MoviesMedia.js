import React from 'react'

const MoviesMedia = ({ media, chooseMedia, currentMedia }) => {
  return (
    <div className="container">
      <h4 className="subtitle has-text-weight-bold">Media</h4>
      <div className="columns is-mobile">
        {media.posters && <div className="column has-text-weight-semibold" id="posters" onClick={chooseMedia}>
          Posters ({media['posters'].length})
        </div>}
        {media.backdrops && <div className="column has-text-weight-semibold" id="backdrops" onClick={chooseMedia}>
          Backdrop ({media['backdrops'].length})
        </div>}
        {media.videos && <div className="column has-text-weight-semibold" id="videos" onClick={chooseMedia}>
          Videos ({media['videos'].length})
        </div>}
      </div>
      <div id="media-content" className="columns is-mobile">

        {currentMedia!=='videos' && media['videos'] && media[currentMedia].map(image => (
          <img
            key={image.file_path}
            className="image"
            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
          />
        ))}
        {currentMedia==='videos' && media[currentMedia] && media[currentMedia].map((video, i) => (
          <div key={i} className="column is-9-mobile is-7-tablet is-6-desktop is-5-widescreen is-gapless is-paddingless">
            {/* <i data-id={i} className='fas fa-spinner fa-pulse'></i> */}
            <img data-id={i} className="spinner" src="../../assets/712.gif" />
            <iframe
              style={{display: 'none'}}
              key={video.id}
              data-id={i}
              width="100%"
              // height="100%"
              src={`https://www.youtube.com/embed/${video.key}`}
              onLoad={(e) => {
                e.target.style.display = 'flex'
                const spinner = document.querySelector(`.spinner[data-id="${i}"]`)
                spinner.style.display = 'none'
              }}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default MoviesMedia
