import React from 'react'

const MoviesMedia = ({ media, chooseMedia, currentMedia }) => (

  <div className="container">
    <h2 className="subtitle">Media</h2>
    <div className="columns">
      <div className="column" id="videos" onClick={chooseMedia}>Videos</div>
      <div className="column" id="backdrops" onClick={chooseMedia}>Backdrop</div>
      <div className="column" id="posters" onClick={chooseMedia}>Posters</div>
    </div>
    <div id="media-content" className="">

      {currentMedia!=='videos' && media[currentMedia].map(image => (
        <img
          key={image.file_path}
          className="image"
          src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
        />
      ))}
      {currentMedia ==='videos' && media[currentMedia].map(video => (

        <iframe
          key={video.id}
          src={`https://www.youtube.com/embed/${video.key}`}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>

      ))}
    </div>
  </div>
)


export default MoviesMedia
